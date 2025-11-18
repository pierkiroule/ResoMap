import React, { useRef, useEffect, useState } from 'react'
import './DreamMixer.css'

function DreamMixer({ audioAnalyzer, audioData }) {
  const canvasRef = useRef(null)
  const vidBgRef = useRef(null)
  const vidFgRef = useRef(null)
  const imgOvRef = useRef(null)
  const animFrameRef = useRef(null)
  
  const [bgVideo, setBgVideo] = useState(null)
  const [fgVideo, setFgVideo] = useState(null)
  const [overlayImage, setOverlayImage] = useState(null)
  const [showUI, setShowUI] = useState(true)
  
  const particlesRef = useRef([])

  // Initialize particles
  useEffect(() => {
    const W = window.innerWidth
    const H = window.innerHeight
    const particles = []
    
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * 0.4 + 0.2
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

  // File handlers
  const handleBgVideo = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBgVideo(url)
      checkHideUI()
    }
  }

  const handleFgVideo = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFgVideo(url)
      checkHideUI()
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setOverlayImage(url)
      checkHideUI()
    }
  }

  const checkHideUI = () => {
    setTimeout(() => {
      if (bgVideo && fgVideo && overlayImage) {
        setShowUI(false)
        // Play videos
        if (vidBgRef.current) vidBgRef.current.play()
        if (vidFgRef.current) vidFgRef.current.play()
      }
    }, 100)
  }

  // Draw particles
  const drawParticles = (ctx, W, H, treble) => {
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    
    const particles = particlesRef.current
    for (const p of particles) {
      p.x += p.dx
      p.y += p.dy
      
      if (p.x < 0) p.x = W
      if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H
      if (p.y > H) p.y = 0
      
      ctx.globalAlpha = p.a + treble * 0.001
      ctx.fillStyle = 'rgba(180, 200, 255, 1)'
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.restore()
  }

  // Dream filters
  const applyDreamFilters = (ctx, bass, treble, level) => {
    const c = 1 + level * 0.003
    const s = 1 + bass * 0.006
    const br = 1 + treble * 0.004
    
    ctx.filter = `contrast(${c}) saturate(${s}) brightness(${br})`
  }

  // Poetic contour effect
  const drawPoeticContour = (ctx, W, H) => {
    const img = ctx.getImageData(0, 0, W, H)
    const d = img.data
    const t = performance.now() * 0.001
    
    const puls = 0.10 + Math.sin(t * 0.8) * 0.04
    const tintR = 160 + Math.sin(t * 0.7) * 50
    const tintG = 180 + Math.sin(t * 0.5) * 40
    const tintB = 255
    
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2]
      const e = Math.abs(r - g) + Math.abs(g - b)
      const contour = e * 0.20
      
      d[i] = r * (1 - puls) + tintR * puls + contour * 0.6
      d[i + 1] = g * (1 - puls) + tintG * puls + contour * 0.6
      d[i + 2] = b * (1 - puls) + tintB * puls + contour * 0.6
    }
    
    ctx.putImageData(img, 0, 0)
  }

  // Mix video + image
  const drawMix = (ctx, W, H, bass, treble) => {
    ctx.globalCompositeOperation = 'source-over'
    
    // Background video
    const vidBg = vidBgRef.current
    if (vidBg && vidBg.readyState >= 2) {
      const s = Math.max(W / vidBg.videoWidth, H / vidBg.videoHeight)
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
      const s2 = Math.max(W / vidFg.videoWidth, H / vidFg.videoHeight) * 0.9
      ctx.globalAlpha = 0.55 + bass * 0.0015
      ctx.globalCompositeOperation = 'screen'
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
      const s3 = Math.max(W / imgOv.width, H / imgOv.height) * 0.85
      ctx.globalAlpha = 0.5 + treble * 0.001
      ctx.globalCompositeOperation = 'soft-light'
      ctx.drawImage(
        imgOv,
        (W - imgOv.width * s3) / 2,
        (H - imgOv.height * s3) / 2,
        imgOv.width * s3,
        imgOv.height * s3
      )
    }
    
    ctx.globalAlpha = 1
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
      
      // Get audio data (normalized to 0-255 like original)
      const bass = (audioData?.bass || 0) * 255
      const treble = (audioData?.high || 0) * 255
      const level = (audioData?.overall || 0) * 255
      
      applyDreamFilters(ctx, bass, treble, level)
      
      // Create temp canvas for poetic contour
      const tmp = document.createElement('canvas')
      tmp.width = W
      tmp.height = H
      const tCtx = tmp.getContext('2d')
      
      drawMix(tCtx, W, H, bass, treble)
      drawPoeticContour(tCtx, W, H)
      
      ctx.drawImage(tmp, 0, 0)
      drawParticles(ctx, W, H, treble)
      
      animFrameRef.current = requestAnimationFrame(loop)
    }
    
    loop()
    
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [audioData, bgVideo, fgVideo, overlayImage])

  return (
    <div className="dream-mixer">
      {showUI && (
        <div className="dream-ui">
          <label className="dream-label">
            🎬 Fond
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleBgVideo}
              className="dream-input"
            />
          </label>
          <label className="dream-label">
            ✨ Overlay
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFgVideo}
              className="dream-input"
            />
          </label>
          <label className="dream-label">
            🖼️ Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage}
              className="dream-input"
            />
          </label>
        </div>
      )}
      
      <canvas ref={canvasRef} className="dream-canvas" />
      <div className="dream-grain" />
      
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

export default DreamMixer
