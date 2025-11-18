import React, { useState, useRef } from 'react'
import './VideoCapture.css'

function VideoCapture({ canvasRef }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [recordings, setRecordings] = useState([])
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)

  const startCapture = async () => {
    if (!canvasRef || !canvasRef.current) {
      alert('Impossible de capturer - viewer non disponible')
      return
    }

    // Countdown
    setCountdown(3)
    await new Promise(resolve => {
      let count = 3
      const countInterval = setInterval(() => {
        count--
        if (count > 0) {
          setCountdown(count)
        } else {
          clearInterval(countInterval)
          setCountdown(null)
          resolve()
        }
      }, 1000)
    })

    try {
      // Capture the canvas element
      const canvas = canvasRef.current.querySelector('.canvas')
      if (!canvas) {
        alert('Canvas non trouvé')
        return
      }

      // Create a stream from the canvas or viewport
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: 'screen'
        },
        audio: true
      })

      chunksRef.current = []
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000
      })

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop())
        await processRecording()
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      // Auto-stop after 10 seconds
      timerRef.current = setTimeout(() => {
        stopCapture()
      }, 10000)

    } catch (error) {
      console.error('Erreur de capture:', error)
      alert('Erreur lors de la capture. Assurez-vous d\'autoriser le partage d\'écran.')
    }
  }

  const stopCapture = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }

  const processRecording = async () => {
    setIsProcessing(true)

    try {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const videoUrl = URL.createObjectURL(blob)

      // Create video element to process
      const video = document.createElement('video')
      video.src = videoUrl
      video.muted = true

      await new Promise((resolve) => {
        video.onloadedmetadata = resolve
      })

      // Create ping-pong effect
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')

      const frames = []
      const fps = 30
      const duration = video.duration
      const totalFrames = Math.floor(duration * fps)

      // Extract all frames
      for (let i = 0; i < totalFrames; i++) {
        video.currentTime = (i / fps)
        await new Promise(resolve => {
          video.onseeked = resolve
        })
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        frames.push(canvas.toDataURL('image/webp', 0.8))
      }

      // Create ping-pong sequence: forward + reverse
      const pingPongFrames = [...frames, ...frames.slice().reverse()]

      // Create the looping video
      const loopCanvas = document.createElement('canvas')
      loopCanvas.width = canvas.width
      loopCanvas.height = canvas.height
      const loopCtx = loopCanvas.getContext('2d')

      const loopStream = loopCanvas.captureStream(fps)
      const loopRecorder = new MediaRecorder(loopStream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000
      })

      const loopChunks = []
      loopRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          loopChunks.push(event.data)
        }
      }

      loopRecorder.onstop = () => {
        const loopBlob = new Blob(loopChunks, { type: 'video/webm' })
        const loopUrl = URL.createObjectURL(loopBlob)
        
        const newRecording = {
          id: Date.now(),
          name: `Loop ${new Date().toLocaleTimeString()}`,
          url: loopUrl,
          blob: loopBlob,
          date: new Date(),
          frames: pingPongFrames.length,
          duration: (pingPongFrames.length / fps).toFixed(1)
        }

        setRecordings(prev => [...prev, newRecording])
        setIsProcessing(false)
      }

      // Render ping-pong animation
      loopRecorder.start()
      
      for (let i = 0; i < pingPongFrames.length; i++) {
        const img = new Image()
        img.src = pingPongFrames[i]
        await new Promise(resolve => {
          img.onload = () => {
            loopCtx.drawImage(img, 0, 0)
            resolve()
          }
        })
        await new Promise(resolve => setTimeout(resolve, 1000 / fps))
      }

      loopRecorder.stop()

    } catch (error) {
      console.error('Erreur de traitement:', error)
      setIsProcessing(false)
      alert('Erreur lors du traitement de la vidéo')
    }
  }

  const downloadRecording = (recording) => {
    const a = document.createElement('a')
    a.href = recording.url
    a.download = `resomap-loop-${recording.id}.webm`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const deleteRecording = (id) => {
    setRecordings(recordings.filter(r => r.id !== id))
  }

  return (
    <div className="video-capture">
      <div className="capture-controls">
        {!isRecording && !isProcessing && (
          <button className="capture-btn" onClick={startCapture}>
            🎥 Capturer Loop (10s)
          </button>
        )}

        {isRecording && (
          <div className="recording-status">
            <div className="rec-indicator">
              <div className="rec-dot"></div>
              <span>Enregistrement...</span>
            </div>
            <button className="stop-btn" onClick={stopCapture}>
              ⏹️ Stop
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="processing-status">
            <div className="spinner"></div>
            <span>Création du loop ping-pong...</span>
          </div>
        )}
      </div>

      {countdown !== null && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
        </div>
      )}

      {recordings.length > 0 && (
        <div className="recordings-gallery">
          <h4>🎬 Vos Loops</h4>
          <div className="gallery-grid">
            {recordings.map((rec) => (
              <div key={rec.id} className="recording-card">
                <video 
                  src={rec.url} 
                  loop 
                  autoPlay 
                  muted
                  className="preview-video"
                />
                <div className="card-info">
                  <div className="card-title">{rec.name}</div>
                  <div className="card-meta">
                    {rec.frames} frames • {rec.duration}s loop
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className="download-btn"
                    onClick={() => downloadRecording(rec)}
                    title="Télécharger"
                  >
                    ⬇️
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteRecording(rec.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoCapture
