import React, { useRef } from 'react'
import './AudioSourceSelector.css'

/**
 * AudioSourceSelector - Upload d'une source audio pour l'audio-réactivité
 */
function AudioSourceSelector({ onAudioSelect, currentAudioName }) {
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      onAudioSelect(file)
    }
    e.target.value = '' // Reset
  }

  return (
    <div className="audio-source-selector">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      
      <button className="audio-source-btn" onClick={handleClick}>
        <span className="audio-icon">🎵</span>
        <div className="audio-info">
          <span className="audio-label">Audio Source</span>
          <span className="audio-name">
            {currentAudioName || 'Aucune'}
          </span>
        </div>
      </button>
    </div>
  )
}

export default AudioSourceSelector
