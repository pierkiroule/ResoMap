import React, { useRef, useEffect } from 'react'

/**
 * PingPongVideo - Vidéo en mode ping-pong VRAIMENT infini
 * 
 * Joue la vidéo en avant, puis en arrière, puis en avant, etc.
 * Loop infini automatique sans coupure.
 */
function PingPongVideo({ src, style, className, layerId }) {
  const videoRef = useRef(null)
  const directionRef = useRef(1) // 1 = forward, -1 = reverse
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId = null

    const pingPong = (currentTime) => {
      const video = videoRef.current
      if (!video) return

      const duration = video.duration
      const delta = (currentTime - lastTimeRef.current) / 1000 // en secondes

      if (duration && !isNaN(duration)) {
        let newTime = video.currentTime

        // Update time selon direction
        if (directionRef.current === 1) {
          // Forward
          newTime += delta
          if (newTime >= duration) {
            directionRef.current = -1
            newTime = duration - 0.01
          }
        } else {
          // Reverse
          newTime -= delta
          if (newTime <= 0) {
            directionRef.current = 1
            newTime = 0.01
          }
        }

        video.currentTime = newTime
      }

      lastTimeRef.current = currentTime
      animationFrameId = requestAnimationFrame(pingPong)
    }

    // Wait for video to load
    const handleLoadedMetadata = () => {
      video.play().catch(err => console.log('Video play error:', err))
      lastTimeRef.current = performance.now()
      animationFrameId = requestAnimationFrame(pingPong)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    // Si déjà loadée
    if (video.readyState >= 2) {
      handleLoadedMetadata()
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      data-layer-id={layerId}
      muted
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  )
}

export default PingPongVideo
