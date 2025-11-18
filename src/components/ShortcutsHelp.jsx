import React from 'react'
import { SHORTCUTS_LIST } from '../hooks/useKeyboardShortcuts'
import './ShortcutsHelp.css'

function ShortcutsHelp({ onClose }) {
  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shortcuts-content">
          {Object.entries(SHORTCUTS_LIST).map(([category, shortcuts]) => (
            <div key={category} className="shortcuts-category">
              <h3 className="category-title">{category}</h3>
              <div className="shortcuts-grid">
                {shortcuts.map((shortcut, i) => (
                  <div key={i} className="shortcut-row">
                    <div className="shortcut-keys">
                      {shortcut.keys.map((key, j) => (
                        <React.Fragment key={j}>
                          <kbd className="key">{key}</kbd>
                          {j < shortcut.keys.length - 1 && <span className="plus">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="shortcut-description">{shortcut.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer">
          <p>💡 Appuyez sur <kbd className="key">?</kbd> pour afficher cette aide</p>
          <p className="hint">Style Resolume + Ableton Live</p>
        </div>
      </div>
    </div>
  )
}

export default ShortcutsHelp
