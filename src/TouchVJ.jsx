import { useEffect, useRef, useState } from 'react'
import './TouchVJ.css'

export default function TouchVJ() {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  
  const [mode, setMode] = useState('particles') // particles, trails, ripples, paint, kaleidoscope
  const [audioData, setAudioData] = useState({ bass: 0.5, mid: 0.5, high: 0.5 })
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Animation loop
    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.update()
        p.draw(ctx)
        return p.life > 0
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    
    // Mock audio data (replace with real audio analyzer)
    const audioInterval = setInterval(() => {
      setAudioData({
        bass: Math.random() * 0.5 + 0.3,
        mid: Math.random() * 0.5 + 0.3,
        high: Math.random() * 0.5 + 0.3
      })
    }, 100)
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
      clearInterval(audioInterval)
    }
  }, [])
  
  // Touch/Mouse handlers
  const handlePointer = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    const touches = e.touches || [{ clientX: e.clientX, clientY: e.clientY }]
    
    Array.from(touches).forEach(touch => {
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      
      switch(mode) {
        case 'particles':
          spawnParticles(x, y)
          break
        case 'trails':
          addTrail(x, y)
          break
        case 'ripples':
          addRipple(x, y)
          break
        case 'paint':
          paint(x, y)
          break
        case 'kaleidoscope':
          spawnKaleidoscope(x, y)
          break
      }
    })
  }
  
  const spawnParticles = (x, y) => {
    const count = 5 + Math.floor(audioData.bass * 15)
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        life: 1,
        decay: 0.01 + Math.random() * 0.02,
        size: 2 + Math.random() * 4 + audioData.bass * 6,
        hue: (Date.now() / 10 + Math.random() * 60) % 360,
        update() {
          this.x += this.vx
          this.y += this.vy
          this.vy += 0.15 // gravity
          this.life -= this.decay
        },
        draw(ctx) {
          ctx.save()
          ctx.globalAlpha = this.life
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
          grad.addColorStop(0, `hsl(${this.hue}, 100%, 70%)`)
          grad.addColorStop(1, `hsl(${this.hue + 30}, 100%, 50%)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })
    }
  }
  
  const addTrail = (x, y) => {
    const ctx = ctxRef.current
    const hue = (Date.now() / 10) % 360
    const size = 5 + audioData.bass * 10
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
  
  const addRipple = (x, y) => {
    particlesRef.current.push({
      x, y,
      radius: 0,
      maxRadius: 100 + audioData.bass * 200,
      speed: 2 + audioData.bass * 5,
      hue: (Date.now() / 10) % 360,
      life: 1,
      update() {
        this.radius += this.speed
        this.life = 1 - (this.radius / this.maxRadius)
      },
      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.life
        ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    })
  }
  
  const paint = (x, y) => {
    const ctx = ctxRef.current
    const hue = (Date.now() / 10 + audioData.mid * 180) % 360
    const size = 20 + audioData.bass * 40
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size)
    grad.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`)
    grad.addColorStop(1, `hsla(${hue + 60}, 100%, 50%, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
  
  const spawnKaleidoscope = (x, y) => {
    const canvas = canvasRef.current
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const segments = 8
    
    for (let i = 0; i < segments; i++) {
      const angle = (Math.PI * 2 / segments) * i
      const rx = x - cx
      const ry = y - cy
      const mx = cx + (rx * Math.cos(angle) - ry * Math.sin(angle))
      const my = cy + (rx * Math.sin(angle) + ry * Math.cos(angle))
      spawnParticles(mx, my)
    }
  }
  
  const clear = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particlesRef.current = []
  }
  
  return (
    <div className="touch-vj">
      <canvas
        ref={canvasRef}
        className="vj-canvas"
        onTouchStart={handlePointer}
        onTouchMove={handlePointer}
        onMouseDown={handlePointer}
        onMouseMove={(e) => e.buttons === 1 && handlePointer(e)}
      />
      
      <div className="ui">
        <button 
          className={mode === 'particles' ? 'active' : ''}
          onClick={() => setMode('particles')}
        >
          ✨
        </button>
        <button 
          className={mode === 'trails' ? 'active' : ''}
          onClick={() => setMode('trails')}
        >
          🌊
        </button>
        <button 
          className={mode === 'ripples' ? 'active' : ''}
          onClick={() => setMode('ripples')}
        >
          💫
        </button>
        <button 
          className={mode === 'paint' ? 'active' : ''}
          onClick={() => setMode('paint')}
        >
          🎨
        </button>
        <button 
          className={mode === 'kaleidoscope' ? 'active' : ''}
          onClick={() => setMode('kaleidoscope')}
        >
          🔮
        </button>
        <button className="clear" onClick={clear}>🗑️</button>
      </div>
      
      <div className="audio-viz">
        <div className="bar" style={{ width: `${audioData.bass * 100}%` }}>🔊</div>
        <div className="bar" style={{ width: `${audioData.mid * 100}%` }}>🎸</div>
        <div className="bar" style={{ width: `${audioData.high * 100}%` }}>🎹</div>
      </div>
    </div>
  )
}
