import React from 'react'
import './ClipBrowser.css'

// Color coding par type de média (Resolume style)
const getMediaColor = (type) => {
  const colors = {
    'video': '#ff3366',  // Rouge
    'image': '#3366ff',  // Bleu
    'audio': '#00ff88',  // Vert
    'gif': '#ffaa00'     // Orange
  }
  return colors[type] || '#667eea'
}

const getMediaIcon = (type) => {
  const icons = {
    'video': '🎬',
    'image': '🖼️',
    'audio': '🎵',
    'gif': '✨'
  }
  return icons[type] || '📄'
}

function ClipBrowser({ layers, selectedLayer, onSelectLayer, onDeleteLayer, isMinimized }) {
  if (isMinimized) {
    return (
      <div className="clip-browser minimized">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`clip-mini ${selectedLayer?.id === layer.id ? 'selected' : ''}`}
            style={{ borderLeft: `3px solid ${getMediaColor(layer.type)}` }}
            onClick={() => onSelectLayer(layer)}
            title={layer.name}
          >
            <span className="clip-mini-icon">{getMediaIcon(layer.type)}</span>
            <span className="clip-mini-number">{index + 1}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="clip-browser">
      {layers.length === 0 ? (
        <div className="empty-clips">
          <p className="empty-icon">📚</p>
          <p className="empty-text">Aucun clip</p>
          <p className="empty-hint">Ajoutez un calque pour commencer</p>
        </div>
      ) : (
        <div className="clips-list">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`clip-item ${selectedLayer?.id === layer.id ? 'selected' : ''}`}
              style={{
                borderLeft: `4px solid ${getMediaColor(layer.type)}`,
                boxShadow: selectedLayer?.id === layer.id 
                  ? `0 0 15px ${getMediaColor(layer.type)}80` 
                  : 'none'
              }}
              onClick={() => onSelectLayer(layer)}
            >
              {/* Clip header */}
              <div className="clip-header">
                <div className="clip-number" style={{ 
                  background: getMediaColor(layer.type),
                  color: 'white'
                }}>
                  {index + 1}
                </div>
                <div className="clip-icon">{getMediaIcon(layer.type)}</div>
                <div className="clip-info">
                  <div className="clip-name">{layer.name}</div>
                  <div className="clip-type" style={{ color: getMediaColor(layer.type) }}>
                    {layer.type.toUpperCase()}
                  </div>
                </div>
                <button
                  className="clip-delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteLayer(layer.id)
                  }}
                  title="Supprimer (Delete)"
                >
                  ✕
                </button>
              </div>

              {/* Clip preview */}
              <div className="clip-preview">
                {layer.type === 'video' && (
                  <video 
                    src={layer.src} 
                    className="clip-thumbnail"
                    muted
                  />
                )}
                {layer.type === 'image' && (
                  <img 
                    src={layer.src} 
                    className="clip-thumbnail" 
                    alt={layer.name}
                  />
                )}
                {layer.type === 'audio' && (
                  <div className="clip-thumbnail audio-placeholder">
                    🎵
                  </div>
                )}
              </div>

              {/* Clip stats */}
              <div className="clip-stats">
                <div className="stat">
                  <span className="stat-label">Opacity</span>
                  <span className="stat-value">{(layer.opacity * 100).toFixed(0)}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Scale</span>
                  <span className="stat-value">{layer.scale.toFixed(1)}x</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Blend</span>
                  <span className="stat-value">{layer.blendMode}</span>
                </div>
              </div>

              {/* Audio reactive badge */}
              {Object.values(layer.audioReactive || {}).some(ar => ar?.enabled) && (
                <div className="audio-active-badge" title="Audio-réactif actif">
                  🔊
                </div>
              )}

              {/* Chromakey badge */}
              {layer.chromaKey?.enabled && (
                <div className="chromakey-badge" title="Chromakey actif">
                  🔑
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClipBrowser
