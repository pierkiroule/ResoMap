import React, { useRef, useEffect, useState } from 'react'
import './TouchVJPad.css'

function TouchVJPad({ layers, audioData, onUpdateLayer }) {
  const canvasRef = useRef(null)
  const [touches, setTouches] = useState([])
  const [isActive, setIsActive] = useState(false)
  const animFrameRef = useRef(null)

  // Convert touch position to normalized values (0-1)
  const getTouchData = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return []

    const touchList = e.touches || (e.type.includes('mouse') ? [e] : [])
    
    return Array.from(touchList).map(touch => {
      const x = ((touch.clientX || touch.pageX) - rect.left) / rect.width
      const y = ((touch.clientY || touch.pageY) - rect.top) / rect.height
      
      return {
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
        id: touch.identifier || 0
      }
    })
  }

  // Apply touch data to all layers
  const applyTouchEffects = (touchData) => {
    if (touchData.length === 0 || layers.length === 0) return

    const mainTouch = touchData[0]
    
    // X axis controls (0 = left, 1 = right)
    const hueRotate = mainTouch.x * 360  // 0-360°
    const scale = 0.5 + mainTouch.x * 2  // 0.5x - 2.5x
    
    // Y axis controls (0 = top, 1 = bottom)
    const brightness = 50 + (1 - mainTouch.y) * 150  // 50% - 200%
    const blur = mainTouch.y * 20  // 0-20px
    
    // Audio modulation
    const bassBoost = audioData?.bass || 0
    const midBoost = audioData?.mid || 0
    const trebleBoost = audioData?.high || 0
    
    // Apply to all visible layers
    layers.forEach(layer => {
      if (!layer.visible) return
      
      const updates = {
        filters: {
          ...layer.filters,
          hueRotate: hueRotate + bassBoost * 180,
          brightness: brightness + trebleBoost * 50,
          blur: blur + midBoost * 10,
          saturate: 100 + mainTouch.x * 100 + bassBoost * 100,
          contrast: 100 + mainTouch.y * 50
        },
        scale: scale * (1 + bassBoost * 0.5),
        rotation: layer.rotation + bassBoost * 5,
        opacity: Math.max(0.3, Math.min(1, layer.opacity + trebleBoost * 0.3))
      }
      
      onUpdateLayer(layer.id, updates)
    })
  }

  // Touch handlers
  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsActive(true)
    const touchData = getTouchData(e)
    setTouches(touchData)
    applyTouchEffects(touchData)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (!isActive) return
    const touchData = getTouchData(e)
    setTouches(touchData)
    applyTouchEffects(touchData)
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    const touchData = getTouchData(e)
    
    if (touchData.length === 0) {
      setIsActive(false)
      setTouches([])
    } else {
      setTouches(touchData)
    }
  }

  // Mouse handlers (desktop)
  const handleMouseDown = (e) => {
    handleTouchStart(e)
  }

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return
    handleTouchMove(e)
  }

  const handleMouseUp = (e) => {
    handleTouchEnd(e)
  }

  // Render visual feedback
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Grid overlay
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)'
      ctx.lineWidth = 1
      
      // Vertical lines
      for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let i = 0; i <= 10; i++) {
        const y = (canvas.height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      
      // Touch points
      touches.forEach((touch, index) => {
        const x = touch.x * canvas.width
        const y = touch.y * canvas.height
        
        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100)
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.4)')
        gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.2)')
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(x - 100, y - 100, 200, 200)
        
        // Touch point
        ctx.fillStyle = '#667eea'
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner dot
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        
        // Touch number
        if (touches.length > 1) {
          ctx.fillStyle = 'white'
          ctx.font = 'bold 14px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(index + 1, x, y)
        }
        
        // Crosshair
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x - 30, y)
        ctx.lineTo(x + 30, y)
        ctx.moveTo(x, y - 30)
        ctx.lineTo(x, y + 30)
        ctx.stroke()
      })
      
      // Audio bars
      if (audioData) {
        const barWidth = 60
        const barSpacing = 10
        const maxHeight = 150
        const startX = canvas.width - (barWidth * 3 + barSpacing * 2 + 20)
        const startY = canvas.height - 20
        
        // Bass
        ctx.fillStyle = 'rgba(255, 51, 102, 0.8)'
        const bassHeight = audioData.bass * maxHeight
        ctx.fillRect(startX, startY - bassHeight, barWidth, bassHeight)
        
        // Mid
        ctx.fillStyle = 'rgba(102, 126, 234, 0.8)'
        const midHeight = audioData.mid * maxHeight
        ctx.fillRect(startX + barWidth + barSpacing, startY - midHeight, barWidth, midHeight)
        
        // High
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)'
        const highHeight = audioData.high * maxHeight
        ctx.fillRect(startX + (barWidth + barSpacing) * 2, startY - highHeight, barWidth, highHeight)
        
        // Labels
        ctx.fillStyle = 'white'
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('BASS', startX + barWidth / 2, startY + 15)
        ctx.fillText('MID', startX + barWidth + barSpacing + barWidth / 2, startY + 15)
        ctx.fillText('HIGH', startX + (barWidth + barSpacing) * 2 + barWidth / 2, startY + 15)
      }
      
      animFrameRef.current = requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [touches, audioData])

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="touch-vj-pad">
      <canvas
        ref={canvasRef}
        className="vj-canvas"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      
      {/* Info overlay */}
      <div className="vj-info">
        <div className="vj-info-item">
          <span className="info-label">↔ X Axis</span>
          <span className="info-value">Hue • Scale • Saturation</span>
        </div>
        <div className="vj-info-item">
          <span className="info-label">↕ Y Axis</span>
          <span className="info-value">Brightness • Blur • Contrast</span>
        </div>
        <div className="vj-info-item">
          <span className="info-label">🎵 Audio</span>
          <span className="info-value">Bass • Mid • Treble boost</span>
        </div>
      </div>
      
      {!isActive && touches.length === 0 && (
        <div className="vj-hint">
          <div className="hint-icon">👆</div>
          <p className="hint-text">Touch & Drag pour contrôler les effets</p>
          <p className="hint-subtext">Tes doigts = Contrôleur temps réel</p>
        </div>
      )}
    </div>
  )
}

export default TouchVJPad
