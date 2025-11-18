import React, { useState, useRef, useEffect } from 'react'
import ProLayout from './components/ProLayout'
import ClipBrowser from './components/ClipBrowser'
import TabsInspector from './components/TabsInspector'
import Viewer from './components/Viewer'
import ShortcutsHelp from './components/ShortcutsHelp'
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'
import AudioAnalyzer from './utils/AudioAnalyzer'
import './App.css'

function App() {
  const [layers, setLayers] = useState([])
  const [selectedLayerId, setSelectedLayerId] = useState(null)
  const [audioData, setAudioData] = useState({ bass: 0, mid: 0, high: 0, overall: 0 })
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const audioAnalyzerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    // Initialize audio analyzer
    audioAnalyzerRef.current = new AudioAnalyzer()
    
    // Animation loop for audio analysis
    const updateAudioData = () => {
      if (audioAnalyzerRef.current) {
        const data = audioAnalyzerRef.current.getFrequencyData()
        setAudioData(data)
      }
      animationFrameRef.current = requestAnimationFrame(updateAudioData)
    }
    
    updateAudioData()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioAnalyzerRef.current) {
        audioAnalyzerRef.current.destroy()
      }
    }
  }, [])

  const addLayer = (file) => {
    const newLayer = {
      id: Date.now(),
      name: file.name,
      type: getFileType(file),
      src: URL.createObjectURL(file),
      file: file,
      visible: true,
      opacity: 1,
      blendMode: 'normal',
      chromaKey: {
        enabled: false,
        color: '#00ff00',
        threshold: 0.4,
        smoothness: 0.1
      },
      filters: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotate: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0
      },
      audioReactive: {
        opacity: { enabled: false, source: 'overall', min: 0, max: 1, intensity: 1 },
        scale: { enabled: false, source: 'bass', min: 0.8, max: 1.5, intensity: 1 },
        rotation: { enabled: false, source: 'mid', min: 0, max: 360, intensity: 1 },
        blur: { enabled: false, source: 'high', min: 0, max: 10, intensity: 1 },
        brightness: { enabled: false, source: 'overall', min: 80, max: 150, intensity: 1 },
        hueRotate: { enabled: false, source: 'overall', min: 0, max: 360, intensity: 1 }
      },
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const handleFileImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => addLayer(file))
  }

  const getFileType = (file) => {
    const type = file.type
    if (type.startsWith('image/')) return 'image'
    if (type.startsWith('video/')) return 'video'
    if (type.startsWith('audio/')) return 'audio'
    if (type === 'image/gif') return 'gif'
    return 'unknown'
  }

  const updateLayer = (id, updates) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, ...updates } : layer
    ))
  }

  const restoreSnapshot = (snapshotLayers) => {
    setLayers(snapshotLayers)
    setSelectedLayerId(null)
  }

  const deleteLayer = (id) => {
    setLayers(layers.filter(layer => layer.id !== id))
    if (selectedLayerId === id) setSelectedLayerId(null)
  }

  const reorderLayers = (startIndex, endIndex) => {
    const result = Array.from(layers)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setLayers(result)
  }

  const selectedLayer = layers.find(l => l.id === selectedLayerId)

  const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light']

  // Keyboard shortcuts callbacks
  const shortcutsCallbacks = {
    // Navigation
    selectLayer: (index) => {
      if (layers[index]) setSelectedLayerId(layers[index].id)
    },
    toggleFullscreen: () => setIsFullscreen(!isFullscreen),
    exitFullscreen: () => setIsFullscreen(false),

    // Édition
    deleteSelectedLayer: () => {
      if (selectedLayerId) deleteLayer(selectedLayerId)
    },
    duplicateLayer: () => {
      if (selectedLayer) {
        const duplicate = { ...selectedLayer, id: Date.now(), name: `${selectedLayer.name} (copy)` }
        setLayers([...layers, duplicate])
      }
    },

    // Performance
    applyPreset: (preset) => {
      if (!selectedLayer) return
      const presets = {
        vibrant: { filters: { ...selectedLayer.filters, brightness: 120, contrast: 110, saturate: 120 } },
        dramatic: { filters: { ...selectedLayer.filters, brightness: 90, contrast: 120, saturate: 80 } },
        blackwhite: { filters: { ...selectedLayer.filters, grayscale: 100, contrast: 110 } },
        vintage: { filters: { ...selectedLayer.filters, sepia: 80, brightness: 110 } }
      }
      if (presets[preset]) updateLayer(selectedLayerId, presets[preset])
    },
    toggleChromakey: () => {
      if (selectedLayer) {
        updateLayer(selectedLayerId, { 
          chromaKey: { ...selectedLayer.chromaKey, enabled: !selectedLayer.chromaKey.enabled }
        })
      }
    },

    // Calques
    moveLayerUp: () => {
      if (!selectedLayer) return
      const index = layers.findIndex(l => l.id === selectedLayerId)
      if (index > 0) reorderLayers(index, index - 1)
    },
    moveLayerDown: () => {
      if (!selectedLayer) return
      const index = layers.findIndex(l => l.id === selectedLayerId)
      if (index < layers.length - 1) reorderLayers(index, index + 1)
    },
    cycleBlendMode: (direction) => {
      if (!selectedLayer) return
      const currentIndex = blendModes.indexOf(selectedLayer.blendMode)
      const newIndex = (currentIndex + direction + blendModes.length) % blendModes.length
      updateLayer(selectedLayerId, { blendMode: blendModes[newIndex] })
    },
    setLayerOpacity: (opacity) => {
      if (selectedLayer) updateLayer(selectedLayerId, { opacity })
    },

    // Help
    showHelp: () => setShowShortcutsHelp(true)
  }

  useKeyboardShortcuts(shortcutsCallbacks)

  return (
    <div className="app">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <header className="app-header-pro">
        <div className="header-left">
          <h1>🌙 Resomap</h1>
          <span className="subtitle">Professional VJ Suite</span>
        </div>
        <div className="header-center">
          <button className="header-btn" onClick={handleFileImport}>
            + Import Media
          </button>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={() => setShowShortcutsHelp(true)} title="Keyboard Shortcuts (?)">
            ⌨️
          </button>
        </div>
      </header>

      <ProLayout
        clipBrowser={
          <ClipBrowser
            layers={layers}
            selectedLayer={selectedLayer}
            onSelectLayer={(layer) => setSelectedLayerId(layer.id)}
            onDeleteLayer={deleteLayer}
          />
        }
        viewer={
          <Viewer
            layers={layers}
            audioData={audioData}
            audioAnalyzer={audioAnalyzerRef.current}
            onUpdateLayer={updateLayer}
            selectedLayer={selectedLayer}
          />
        }
        inspector={
          <TabsInspector
            layer={selectedLayer}
            onUpdateLayer={updateLayer}
          />
        }
        onToggleFullscreen={(fullscreen) => setIsFullscreen(fullscreen)}
      />

      {showShortcutsHelp && (
        <ShortcutsHelp onClose={() => setShowShortcutsHelp(false)} />
      )}
    </div>
  )
}

export default App
