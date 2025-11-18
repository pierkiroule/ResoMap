import React, { useState } from 'react'
import './ProLayout.css'

function ProLayout({ 
  clipBrowser,
  viewer, 
  inspector,
  timeline,
  onToggleFullscreen 
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [clipBrowserWidth, setClipBrowserWidth] = useState(300)
  const [inspectorWidth, setInspectorWidth] = useState(320)
  const [showTimeline, setShowTimeline] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (onToggleFullscreen) onToggleFullscreen(!isFullscreen)
  }

  if (isFullscreen) {
    return (
      <div className="pro-layout fullscreen">
        <div className="fullscreen-overlay">
          <button 
            className="exit-fullscreen"
            onClick={toggleFullscreen}
            title="Sortir du mode plein écran (Esc)"
          >
            ✕
          </button>
          {viewer}
        </div>
      </div>
    )
  }

  return (
    <div className="pro-layout">
      {/* Clip Browser - Left */}
      <div 
        className="clip-browser-zone"
        style={{ width: `${clipBrowserWidth}px` }}
      >
        <div className="zone-header">
          <span className="zone-title">📚 CLIPS</span>
          <button 
            className="zone-btn"
            onClick={() => setClipBrowserWidth(clipBrowserWidth === 300 ? 40 : 300)}
            title="Minimiser/Agrandir"
          >
            {clipBrowserWidth === 300 ? '◀' : '▶'}
          </button>
        </div>
        <div className="zone-content">
          {clipBrowser}
        </div>
      </div>

      {/* Resizer */}
      <div 
        className="resizer resizer-left"
        onMouseDown={(e) => {
          e.preventDefault()
          const startX = e.pageX
          const startWidth = clipBrowserWidth

          const handleMouseMove = (e) => {
            const diff = e.pageX - startX
            setClipBrowserWidth(Math.max(40, Math.min(500, startWidth + diff)))
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }}
      />

      {/* Main Content - Center */}
      <div className="main-content-zone">
        <div className="zone-header">
          <span className="zone-title">🎨 COMPOSITION</span>
          <div className="zone-actions">
            <button 
              className="zone-btn"
              onClick={() => setShowTimeline(!showTimeline)}
              title="Afficher/Masquer Timeline"
            >
              ⏱️
            </button>
            <button 
              className="zone-btn"
              onClick={toggleFullscreen}
              title="Mode plein écran (F)"
            >
              ⛶
            </button>
          </div>
        </div>
        
        <div className="viewer-container">
          {viewer}
        </div>

        {showTimeline && (
          <div className="timeline-zone">
            <div className="timeline-header">
              <span className="zone-title">⏱️ TIMELINE</span>
              <button 
                className="zone-btn"
                onClick={() => setShowTimeline(false)}
                title="Fermer"
              >
                ✕
              </button>
            </div>
            <div className="timeline-content">
              {timeline || <TimelinePlaceholder />}
            </div>
          </div>
        )}
      </div>

      {/* Resizer */}
      <div 
        className="resizer resizer-right"
        onMouseDown={(e) => {
          e.preventDefault()
          const startX = e.pageX
          const startWidth = inspectorWidth

          const handleMouseMove = (e) => {
            const diff = startX - e.pageX
            setInspectorWidth(Math.max(280, Math.min(500, startWidth + diff)))
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }}
      />

      {/* Inspector - Right */}
      <div 
        className="inspector-zone"
        style={{ width: `${inspectorWidth}px` }}
      >
        <div className="zone-header">
          <span className="zone-title">⚙️ INSPECTOR</span>
          <button 
            className="zone-btn"
            onClick={() => setInspectorWidth(inspectorWidth === 320 ? 40 : 320)}
            title="Minimiser/Agrandir"
          >
            {inspectorWidth === 320 ? '▶' : '◀'}
          </button>
        </div>
        <div className="zone-content">
          {inspector}
        </div>
      </div>
    </div>
  )
}

function TimelinePlaceholder() {
  return (
    <div className="timeline-placeholder">
      <p>⏱️ Timeline - Coming soon</p>
      <p className="hint">Automation & Recording playback</p>
    </div>
  )
}

export default ProLayout
