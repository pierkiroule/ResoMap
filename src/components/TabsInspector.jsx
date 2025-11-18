import React, { useState } from 'react'
import './TabsInspector.css'

function TabsInspector({ layer, onUpdateLayer, showDreamMixer, onToggleDreamMixer }) {
  const [activeTab, setActiveTab] = useState('transform')

  if (!layer && !showDreamMixer) {
    return (
      <div className="tabs-inspector empty">
        <p className="empty-message">Sélectionnez un calque</p>
        <p className="empty-hint">Cliquez sur un clip à gauche</p>
        <button 
          className="dream-mixer-toggle"
          onClick={onToggleDreamMixer}
        >
          🌙 Dream Mixer
        </button>
      </div>
    )
  }

  const tabs = [
    { id: 'transform', icon: '🎨', label: 'Transform' },
    { id: 'effects', icon: '🌈', label: 'Effects' },
    { id: 'audio', icon: '🎵', label: 'Audio' },
    { id: 'keying', icon: '🔑', label: 'Keying' },
    { id: 'advanced', icon: '⚙️', label: 'Advanced' }
  ]

  return (
    <div className="tabs-inspector">
      {/* Tab Headers */}
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {activeTab === 'transform' && (
          <TransformTab layer={layer} onUpdateLayer={onUpdateLayer} />
        )}
        {activeTab === 'effects' && (
          <EffectsTab layer={layer} onUpdateLayer={onUpdateLayer} />
        )}
        {activeTab === 'audio' && (
          <AudioTab layer={layer} onUpdateLayer={onUpdateLayer} />
        )}
        {activeTab === 'keying' && (
          <KeyingTab layer={layer} onUpdateLayer={onUpdateLayer} />
        )}
        {activeTab === 'advanced' && (
          <AdvancedTab layer={layer} onUpdateLayer={onUpdateLayer} />
        )}
      </div>
    </div>
  )
}

// Transform Tab
function TransformTab({ layer, onUpdateLayer }) {
  return (
    <div className="tab-panel">
      <div className="presets-row">
        <button className="preset-pill" onClick={() => onUpdateLayer(layer.id, { 
          scale: 1, rotation: 0, opacity: 1, position: { x: 0, y: 0 }
        })}>
          Reset
        </button>
        <button className="preset-pill" onClick={() => onUpdateLayer(layer.id, { 
          scale: 1.5, opacity: 1
        })}>
          Fill
        </button>
        <button className="preset-pill" onClick={() => onUpdateLayer(layer.id, { 
          scale: 0.8, opacity: 1
        })}>
          Fit
        </button>
      </div>

      <div className="param-section">
        <ParamSlider
          label="Opacity"
          value={layer.opacity}
          min={0}
          max={1}
          step={0.01}
          format={(v) => `${(v * 100).toFixed(0)}%`}
          onChange={(v) => onUpdateLayer(layer.id, { opacity: v })}
          audioReactive={layer.audioReactive?.opacity}
        />

        <ParamSlider
          label="Scale"
          value={layer.scale}
          min={0.1}
          max={3}
          step={0.1}
          format={(v) => `${v.toFixed(1)}x`}
          onChange={(v) => onUpdateLayer(layer.id, { scale: v })}
          audioReactive={layer.audioReactive?.scale}
        />

        <ParamSlider
          label="Rotation"
          value={layer.rotation}
          min={0}
          max={360}
          step={1}
          format={(v) => `${v}°`}
          onChange={(v) => onUpdateLayer(layer.id, { rotation: v })}
          audioReactive={layer.audioReactive?.rotation}
        />
      </div>
    </div>
  )
}

// Effects Tab
function EffectsTab({ layer, onUpdateLayer }) {
  const presets = [
    { name: '☀️ Vibrant', values: { brightness: 120, contrast: 110, saturate: 120 } },
    { name: '🌙 Dramatique', values: { brightness: 90, contrast: 120, saturate: 80 } },
    { name: '⚫ N&B', values: { grayscale: 100, contrast: 110 } },
    { name: '📜 Vintage', values: { sepia: 80, brightness: 110 } }
  ]

  return (
    <div className="tab-panel">
      <div className="presets-row">
        {presets.map((preset, i) => (
          <button
            key={i}
            className="preset-pill"
            onClick={() => onUpdateLayer(layer.id, {
              filters: { ...layer.filters, ...preset.values }
            })}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="param-section">
        <ParamSlider
          label="Blur"
          value={layer.filters.blur}
          min={0}
          max={20}
          step={0.5}
          format={(v) => `${v.toFixed(1)}px`}
          onChange={(v) => onUpdateLayer(layer.id, {
            filters: { ...layer.filters, blur: v }
          })}
          audioReactive={layer.audioReactive?.blur}
        />

        <ParamSlider
          label="Brightness"
          value={layer.filters.brightness}
          min={0}
          max={200}
          step={1}
          format={(v) => `${v}%`}
          onChange={(v) => onUpdateLayer(layer.id, {
            filters: { ...layer.filters, brightness: v }
          })}
          audioReactive={layer.audioReactive?.brightness}
        />

        <ParamSlider
          label="Contrast"
          value={layer.filters.contrast}
          min={0}
          max={200}
          step={1}
          format={(v) => `${v}%`}
          onChange={(v) => onUpdateLayer(layer.id, {
            filters: { ...layer.filters, contrast: v }
          })}
        />

        <ParamSlider
          label="Saturate"
          value={layer.filters.saturate}
          min={0}
          max={200}
          step={1}
          format={(v) => `${v}%`}
          onChange={(v) => onUpdateLayer(layer.id, {
            filters: { ...layer.filters, saturate: v }
          })}
        />
      </div>

      <button 
        className="reset-all-btn"
        onClick={() => onUpdateLayer(layer.id, {
          filters: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
            hueRotate: 0,
            grayscale: 0,
            sepia: 0,
            invert: 0
          }
        })}
      >
        🔄 Reset All Filters
      </button>
    </div>
  )
}

// Audio Tab
function AudioTab({ layer, onUpdateLayer }) {
  return (
    <div className="tab-panel">
      <div className="audio-status">
        <p>🎵 Audio-réactivité</p>
        <p className="hint">Configure les paramètres ci-dessous</p>
      </div>
    </div>
  )
}

// Keying Tab
function KeyingTab({ layer, onUpdateLayer }) {
  return (
    <div className="tab-panel">
      <div className="chromakey-toggle">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={layer.chromaKey.enabled}
            onChange={(e) => onUpdateLayer(layer.id, {
              chromaKey: { ...layer.chromaKey, enabled: e.target.checked }
            })}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">Enable Chromakey</span>
        </label>
      </div>

      {layer.chromaKey.enabled && (
        <div className="param-section">
          <div className="color-picker-row">
            <label>Key Color</label>
            <input
              type="color"
              value={layer.chromaKey.color}
              onChange={(e) => onUpdateLayer(layer.id, {
                chromaKey: { ...layer.chromaKey, color: e.target.value }
              })}
            />
          </div>

          <ParamSlider
            label="Threshold"
            value={layer.chromaKey.threshold}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={(v) => onUpdateLayer(layer.id, {
              chromaKey: { ...layer.chromaKey, threshold: v }
            })}
          />

          <ParamSlider
            label="Smoothness"
            value={layer.chromaKey.smoothness}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={(v) => onUpdateLayer(layer.id, {
              chromaKey: { ...layer.chromaKey, smoothness: v }
            })}
          />
        </div>
      )}
    </div>
  )
}

// Advanced Tab
function AdvancedTab({ layer, onUpdateLayer }) {
  return (
    <div className="tab-panel">
      <div className="param-section">
        <label>Blend Mode</label>
        <select
          value={layer.blendMode}
          onChange={(e) => onUpdateLayer(layer.id, { blendMode: e.target.value })}
          className="blend-select"
        >
          <option value="normal">Normal</option>
          <option value="multiply">Multiply</option>
          <option value="screen">Screen</option>
          <option value="overlay">Overlay</option>
          <option value="darken">Darken</option>
          <option value="lighten">Lighten</option>
          <option value="color-dodge">Color Dodge</option>
          <option value="color-burn">Color Burn</option>
          <option value="hard-light">Hard Light</option>
          <option value="soft-light">Soft Light</option>
        </select>
      </div>
    </div>
  )
}

// Param Slider Component
function ParamSlider({ label, value, min, max, step, format, onChange, audioReactive }) {
  return (
    <div className="param-slider">
      <div className="param-header">
        <span className="param-label">{label}</span>
        {audioReactive?.enabled && <span className="audio-badge">🔊</span>}
        <span className="param-value">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="param-range"
      />
    </div>
  )
}

export default TabsInspector
