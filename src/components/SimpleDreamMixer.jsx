import React, { useRef, useEffect, useState } from 'react'
import './SimpleDreamMixer.css'

function SimpleDreamMixer({ audioData }) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  
  const [bgVideo, setBgVideo] = useState(null)
  const [fgVideo, setFgVideo] = useState(null)
  const [overlayImage, setOverlayImage] = useState(null)
  
  const vidBgRef = useRef(null)
  const vidFgRef = useRef(null)
  const imgOvRef = useRef(null)
  
  const particlesRef = useRef([])
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchOffsetRef = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const rotationRef = useRef(0)

  // Initialize particles
  useEffect(() => {
    const W = window.innerWidth
    const H = window.innerHeight
    const particles = []
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 3 + 1,
        a: Math.random() * 0.6 + 0.3
      })
    }
    
    particlesRef.current = particles
  }, [])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Drag & Drop files
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleDrop = (e) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      
      files.forEach(file => {
        const type = file.type
        
        if (type.startsWith('video/')) {
          const url = URL.createObjectURL(file)
          if (!bgVideo) {
            setBgVideo(url)
          } else if (!fgVideo) {
            setFgVideo(url)
          }
        } else if (type.startsWith('image/')) {
          setOverlayImage(URL.createObjectURL(file))
        }
      })
    }

    const handleDragOver = (e) => {
      e.preventDefault()
    }

    canvas.addEventListener('drop', handleDrop)
    canvas.addEventListener('dragover', handleDragOver)

    return () => {
      canvas.removeEventListener('drop', handleDrop)
      canvas.removeEventListener('dragover', handleDragOver)
    }
  }, [bgVideo, fgVideo])

  // Touch interactions
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Mouse/Touch handlers
    const handleStart = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      touchStartRef.current = { x: clientX, y: clientY }
    }

    const handleMove = (e) => {
      if (!e.touches && e.buttons !== 1) return
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      
      const dx = clientX - touchStartRef.current.x
      const dy = clientY - touchStartRef.current.y
      
      touchOffsetRef.current = { x: dx, y: dy }
      touchStartRef.current = { x: clientX, y: clientY }
    }

    const handleWheel = (e) => {
      e.preventDefault()
      
      if (e.ctrlKey || e.metaKey) {
        // Scale
        scaleRef.current += e.deltaY * -0.001
        scaleRef.current = Math.max(0.5, Math.min(3, scaleRef.current))
      } else {
        // Rotation
        rotationRef.current += e.deltaY * 0.5
      }
    }

    canvas.addEventListener('mousedown', handleStart)
    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('touchstart', handleStart)
    canvas.addEventListener('touchmove', handleMove)
    canvas.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener('mousedown', handleStart)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('touchstart', handleStart)
      canvas.removeEventListener('touchmove', handleMove)
      canvas.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Auto-play videos when loaded
  useEffect(() => {
    if (vidBgRef.current && bgVideo) {
      vidBgRef.current.play()
    }
  }, [bgVideo])

  useEffect(() => {
    if (vidFgRef.current && fgVideo) {
      vidFgRef.current.play()
    }
  }, [fgVideo])

  // Draw particles
  const drawParticles = (ctx, W, H, bass, treble) => {
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    
    const particles = particlesRef.current
    for (const p of particles) {
      // Audio-reactive movement
      const bassBoost = bass * 2
      const trebleBoost = treble * 0.5
      
      p.x += p.dx + bassBoost * Math.cos(p.x * 0.01)
      p.y += p.dy + trebleBoost * Math.sin(p.y * 0.01)
      
      if (p.x < 0) p.x = W
      if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H
      if (p.y > H) p.y = 0
      
      const size = p.r * (1 + bass * 3)
      ctx.globalAlpha = p.a + treble * 0.3
      ctx.fillStyle = `hsl(${200 + bass * 100}, 80%, 70%)`
      ctx.beginPath()
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.restore()
  }

  // Poetic contour effect
  const drawPoeticContour = (ctx, W, H, level) => {
    const img = ctx.getImageData(0, 0, W, H)
    const d = img.data
    const t = performance.now() * 0.001
    
    const puls = 0.15 + Math.sin(t * 0.8) * 0.08 + level * 0.2
    const tintR = 160 + Math.sin(t * 0.7 + level * 5) * 70
    const tintG = 180 + Math.sin(t * 0.5 + level * 3) * 60
    const tintB = 255
    
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2]
      const e = Math.abs(r - g) + Math.abs(g - b)
      const contour = e * 0.25
      
      d[i] = r * (1 - puls) + tintR * puls + contour * 0.8
      d[i + 1] = g * (1 - puls) + tintG * puls + contour * 0.8
      d[i + 2] = b * (1 - puls) + tintB * puls + contour * 0.8
    }
    
    ctx.putImageData(img, 0, 0)
  }

  // Draw mix with touch offsets
  const drawMix = (ctx, W, H, bass, treble, level) => {
    ctx.save()
    
    // Apply touch transformations
    ctx.translate(W / 2, H / 2)
    ctx.translate(touchOffsetRef.current.x, touchOffsetRef.current.y)
    ctx.rotate(rotationRef.current * Math.PI / 180)
    ctx.scale(scaleRef.current * (1 + bass * 0.3), scaleRef.current * (1 + bass * 0.3))
    ctx.translate(-W / 2, -H / 2)
    
    ctx.globalCompositeOperation = 'source-over'
    
    // Background video
    const vidBg = vidBgRef.current
    if (vidBg && vidBg.readyState >= 2) {
      const s = Math.max(W / vidBg.videoWidth, H / vidBg.videoHeight)
      ctx.filter = `brightness(${1 + level * 0.5}) contrast(${1 + bass * 0.8})`
      ctx.drawImage(
        vidBg,
        (W - vidBg.videoWidth * s) / 2,
        (H - vidBg.videoHeight * s) / 2,
        vidBg.videoWidth * s,
        vidBg.videoHeight * s
      )
    }
    
    // Foreground video overlay
    const vidFg = vidFgRef.current
    if (vidFg && vidFg.readyState >= 2) {
      const s2 = Math.max(W / vidFg.videoWidth, H / vidFg.videoHeight) * (0.9 + treble * 0.2)
      ctx.globalAlpha = 0.6 + bass * 0.3
      ctx.globalCompositeOperation = 'screen'
      ctx.filter = `hue-rotate(${level * 360}deg) saturate(${1 + bass * 2})`
      ctx.drawImage(
        vidFg,
        (W - vidFg.videoWidth * s2) / 2,
        (H - vidFg.videoHeight * s2) / 2,
        vidFg.videoWidth * s2,
        vidFg.videoHeight * s2
      )
    }
    
    // Image overlay
    const imgOv = imgOvRef.current
    if (imgOv && imgOv.complete) {
      const s3 = Math.max(W / imgOv.width, H / imgOv.height) * (0.85 + treble * 0.15)
      ctx.globalAlpha = 0.5 + treble * 0.4
      ctx.globalCompositeOperation = 'soft-light'
      ctx.filter = `brightness(${1 + level * 0.5})`
      ctx.drawImage(
        imgOv,
        (W - imgOv.width * s3) / 2,
        (H - imgOv.height * s3) / 2,
        imgOv.width * s3,
        imgOv.height * s3
      )
    }
    
    ctx.restore()
  }

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    const loop = () => {
      const W = canvas.width
      const H = canvas.height
      
      ctx.clearRect(0, 0, W, H)
      
      // Get audio data (0-1 normalized)
      const bass = audioData?.bass || 0
      const treble = audioData?.high || 0
      const level = audioData?.overall || 0
      
      // Create temp canvas for effects
      const tmp = document.createElement('canvas')
      tmp.width = W
      tmp.height = H
      const tCtx = tmp.getContext('2d')
      
      drawMix(tCtx, W, H, bass, treble, level)
      drawPoeticContour(tCtx, W, H, level)
      
      ctx.drawImage(tmp, 0, 0)
      drawParticles(ctx, W, H, bass, treble)
      
      animFrameRef.current = requestAnimationFrame(loop)
    }
    
    loop()
    
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [audioData, bgVideo, fgVideo, overlayImage])

  const hasContent = bgVideo || fgVideo || overlayImage

  return (
    <div className="simple-dream-mixer">
      <canvas ref={canvasRef} className="simple-dream-canvas" />
      <div className="simple-dream-grain" />
      
      {!hasContent && (
        <div className="simple-drop-hint">
          <div className="hint-content">
            <div className="hint-icon">🌙</div>
            <h2>Dream Mixer</h2>
            <p>Glisse tes fichiers ici</p>
            <div className="hint-tags">
              <span className="tag">🎬 Vidéos</span>
              <span className="tag">🖼️ Images</span>
            </div>
            <div className="hint-controls">
              <p>🖱️ <strong>Drag</strong> : Déplacer</p>
              <p>🔄 <strong>Scroll</strong> : Rotation</p>
              <p>⚡ <strong>Ctrl+Scroll</strong> : Zoom</p>
            </div>
          </div>
        </div>
      )}
      
      {hasContent && (
        <div className="simple-audio-viz">
          <div className="viz-bar" style={{ height: `${(audioData?.bass || 0) * 100}%` }}>
            <span>BASS</span>
          </div>
          <div className="viz-bar" style={{ height: `${(audioData?.mid || 0) * 100}%` }}>
            <span>MID</span>
          </div>
          <div className="viz-bar" style={{ height: `${(audioData?.high || 0) * 100}%` }}>
            <span>HIGH</span>
          </div>
        </div>
      )}
      
      {/* Hidden video and image elements */}
      <video 
        ref={vidBgRef} 
        src={bgVideo} 
        playsInline 
        muted 
        loop 
        style={{ display: 'none' }}
      />
      <video 
        ref={vidFgRef} 
        src={fgVideo} 
        playsInline 
        muted 
        loop 
        style={{ display: 'none' }}
      />
      <img 
        ref={imgOvRef} 
        src={overlayImage} 
        alt="" 
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default SimpleDreamMixer
