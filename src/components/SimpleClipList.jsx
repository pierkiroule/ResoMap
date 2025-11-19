import React from 'react'
import './SimpleClipList.css'

function SimpleClipList({ layers, onUpdateLayer, onDeleteLayer, onSelectLayer, selectedLayer }) {
  
  const blendModes = [
    { value: 'normal', label: 'Normal' },
    { value: 'screen', label: 'Screen' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'multiply', label: 'Multiply' },
  ]

  const getMediaIcon = (type) => {
    const icons = {
      video: '🎬',
      image: '🖼️',
      audio: '🎵',
      gif: '✨'
    }
    return icons[type] || '📄'
  }

  return (
    <div className="simple-clip-list">
      <div className="clip-list-header">
        <h3>Calques</h3>
        <span className="layer-count">{layers.length}</span>
      </div>

      {layers.length === 0 ? (
        <div className="empty-list">
          <p className="empty-icon">📚</p>
          <p className="empty-text">Aucun calque</p>
          <p className="empty-hint">Ajoute des médias pour commencer</p>
        </div>
      ) : (
        <div className="clips-container">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`clip-card ${selectedLayer?.id === layer.id ? 'selected' : ''} ${!layer.visible ? 'hidden' : ''}`}
              onClick={() => onSelectLayer(layer)}
            >
              {/* Header */}
              <div className="clip-card-header">
                <span className="clip-icon">{getMediaIcon(layer.type)}</span>
                <span className="clip-name">{layer.name}</span>
                <span className="clip-number">#{index + 1}</span>
              </div>

              {/* Blend Mode */}
              <div className="clip-control">
                <label>Blend</label>
                <select
                  value={layer.blendMode}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateLayer(layer.id, { blendMode: e.target.value })
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="blend-select"
                >
                  {blendModes.map(mode => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opacity */}
              <div className="clip-control">
                <label>
                  Opacity 
                  <span className="value-display">{Math.round(layer.opacity * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={layer.opacity}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateLayer(layer.id, { opacity: parseFloat(e.target.value) })
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-slider"
                />
              </div>

              {/* Actions */}
              <div className="clip-actions">
                <button
                  className="action-btn visibility-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdateLayer(layer.id, { visible: !layer.visible })
                  }}
                  title={layer.visible ? 'Masquer' : 'Afficher'}
                >
                  {layer.visible ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteLayer(layer.id)
                  }}
                  title="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SimpleClipList
