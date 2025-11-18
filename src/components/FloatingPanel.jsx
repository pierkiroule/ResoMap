import React, { useState, useRef, useEffect } from 'react'
import './FloatingPanel.css'

function FloatingPanel({ 
  children, 
  title, 
  defaultPosition = { x: 20, y: 100 },
  defaultSize = { width: 320, height: 'auto' },
  onClose 
}) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const panelRef = useRef(null)

  const handleMouseDown = (e) => {
    // Only drag from header
    if (!e.target.closest('.floating-panel-header')) return
    
    setIsDragging(true)
    const rect = panelRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    // Keep within viewport
    const maxX = window.innerWidth - 320
    const maxY = window.innerHeight - 100
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (!e.target.closest('.floating-panel-header')) return
    
    const touch = e.touches[0]
    setIsDragging(true)
    const rect = panelRef.current.getBoundingClientRect()
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    })
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    
    const touch = e.touches[0]
    const newX = touch.clientX - dragOffset.x
    const newY = touch.clientY - dragOffset.y
    
    const maxX = window.innerWidth - 320
    const maxY = window.innerHeight - 100
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div 
      ref={panelRef}
      className={`floating-panel ${isDragging ? 'dragging' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: defaultSize.width,
        height: isMinimized ? 'auto' : defaultSize.height
      }}
    >
      <div 
        className="floating-panel-header"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="panel-title">
          <span className="drag-handle">⋮⋮</span>
          {title}
        </div>
        <div className="panel-controls">
          <button 
            className="panel-btn minimize"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Agrandir" : "Réduire"}
          >
            {isMinimized ? '⬜' : '➖'}
          </button>
          {onClose && (
            <button 
              className="panel-btn close"
              onClick={onClose}
              title="Fermer"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {!isMinimized && (
        <div className="floating-panel-content">
          {children}
        </div>
      )}
    </div>
  )
}

export default FloatingPanel
