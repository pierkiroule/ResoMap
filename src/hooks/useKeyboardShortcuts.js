import { useEffect } from 'react'

/**
 * Hook pour gérer les raccourcis clavier professionnels (Resolume/Ableton style)
 * 
 * @param {Object} callbacks - Callbacks pour chaque action
 * @param {boolean} enabled - Active/désactive les shortcuts
 */
function useKeyboardShortcuts(callbacks, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = e
      const cmdOrCtrl = ctrlKey || metaKey

      // Prévenir les actions par défaut du navigateur
      const preventDefault = () => {
        e.preventDefault()
        e.stopPropagation()
      }

      // ===== NAVIGATION =====
      
      // Tab: Cycle entre zones
      if (key === 'Tab' && !cmdOrCtrl && !shiftKey) {
        preventDefault()
        callbacks.cycleZones?.()
      }

      // Cmd/Ctrl + 1-9: Sélection rapide calque
      if (cmdOrCtrl && key >= '1' && key <= '9') {
        preventDefault()
        const layerIndex = parseInt(key) - 1
        callbacks.selectLayer?.(layerIndex)
      }

      // Space: Play/Pause (TODO: future feature)
      if (key === ' ' && !cmdOrCtrl) {
        preventDefault()
        callbacks.playPause?.()
      }

      // F: Fullscreen viewer
      if (key === 'f' && !cmdOrCtrl) {
        preventDefault()
        callbacks.toggleFullscreen?.()
      }

      // Esc: Exit fullscreen
      if (key === 'Escape') {
        preventDefault()
        callbacks.exitFullscreen?.()
      }

      // ===== ÉDITION =====

      // Delete/Backspace: Supprimer calque sélectionné
      if ((key === 'Delete' || key === 'Backspace') && !cmdOrCtrl) {
        preventDefault()
        callbacks.deleteSelectedLayer?.()
      }

      // Cmd/Ctrl + D: Dupliquer
      if (cmdOrCtrl && key === 'd') {
        preventDefault()
        callbacks.duplicateLayer?.()
      }

      // Cmd/Ctrl + Z: Undo
      if (cmdOrCtrl && key === 'z' && !shiftKey) {
        preventDefault()
        callbacks.undo?.()
      }

      // Cmd/Ctrl + Y or Cmd/Ctrl + Shift + Z: Redo
      if ((cmdOrCtrl && key === 'y') || (cmdOrCtrl && shiftKey && key === 'z')) {
        preventDefault()
        callbacks.redo?.()
      }

      // Cmd/Ctrl + S: Save snapshot
      if (cmdOrCtrl && key === 's') {
        preventDefault()
        callbacks.saveSnapshot?.()
      }

      // Cmd/Ctrl + R: Start/Stop recording
      if (cmdOrCtrl && key === 'r') {
        preventDefault()
        callbacks.toggleRecording?.()
      }

      // ===== PERFORMANCE =====

      // Q: Preset Vibrant
      if (key === 'q' && !cmdOrCtrl) {
        preventDefault()
        callbacks.applyPreset?.('vibrant')
      }

      // W: Preset Dramatique
      if (key === 'w' && !cmdOrCtrl) {
        preventDefault()
        callbacks.applyPreset?.('dramatic')
      }

      // E: Preset N&B
      if (key === 'e' && !cmdOrCtrl) {
        preventDefault()
        callbacks.applyPreset?.('blackwhite')
      }

      // R: Preset Vintage
      if (key === 'r' && !cmdOrCtrl) {
        preventDefault()
        callbacks.applyPreset?.('vintage')
      }

      // A: Toggle audio-réactivité
      if (key === 'a' && !cmdOrCtrl) {
        preventDefault()
        callbacks.toggleAudioReactivity?.()
      }

      // C: Toggle chromakey
      if (key === 'c' && !cmdOrCtrl) {
        preventDefault()
        callbacks.toggleChromakey?.()
      }

      // V: Toggle VJ mode
      if (key === 'v' && !cmdOrCtrl) {
        preventDefault()
        callbacks.toggleVJMode?.()
      }

      // H: Hide/Show panels (viewer only)
      if (key === 'h' && !cmdOrCtrl) {
        preventDefault()
        callbacks.togglePanels?.()
      }

      // ===== CALQUES =====

      // Cmd/Ctrl + ↑: Monter calque
      if (cmdOrCtrl && key === 'ArrowUp') {
        preventDefault()
        callbacks.moveLayerUp?.()
      }

      // Cmd/Ctrl + ↓: Descendre calque
      if (cmdOrCtrl && key === 'ArrowDown') {
        preventDefault()
        callbacks.moveLayerDown?.()
      }

      // Cmd/Ctrl + [: Cycle blend mode prev
      if (cmdOrCtrl && key === '[') {
        preventDefault()
        callbacks.cycleBlendMode?.(-1)
      }

      // Cmd/Ctrl + ]: Cycle blend mode next
      if (cmdOrCtrl && key === ']') {
        preventDefault()
        callbacks.cycleBlendMode?.(1)
      }

      // 1-9 (sans Cmd): Set opacity 10%-90%
      if (!cmdOrCtrl && key >= '1' && key <= '9') {
        preventDefault()
        const opacity = parseInt(key) / 10
        callbacks.setLayerOpacity?.(opacity)
      }

      // 0: Set opacity 100%
      if (!cmdOrCtrl && key === '0') {
        preventDefault()
        callbacks.setLayerOpacity?.(1)
      }

      // ===== HELP =====

      // ?: Show shortcuts help
      if (key === '?' || (shiftKey && key === '/')) {
        preventDefault()
        callbacks.showHelp?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [callbacks, enabled])
}

// Helper: Liste des shortcuts pour affichage
export const SHORTCUTS_LIST = {
  'Navigation': [
    { keys: ['Tab'], description: 'Cycle entre zones' },
    { keys: ['Cmd/Ctrl', '1-9'], description: 'Sélection rapide calque' },
    { keys: ['Space'], description: 'Play/Pause' },
    { keys: ['F'], description: 'Fullscreen viewer' },
    { keys: ['Esc'], description: 'Exit fullscreen' }
  ],
  'Édition': [
    { keys: ['Delete'], description: 'Supprimer calque' },
    { keys: ['Cmd/Ctrl', 'D'], description: 'Dupliquer' },
    { keys: ['Cmd/Ctrl', 'Z'], description: 'Undo' },
    { keys: ['Cmd/Ctrl', 'Y'], description: 'Redo' },
    { keys: ['Cmd/Ctrl', 'S'], description: 'Save snapshot' },
    { keys: ['Cmd/Ctrl', 'R'], description: 'Start/Stop recording' }
  ],
  'Performance': [
    { keys: ['Q'], description: 'Preset Vibrant' },
    { keys: ['W'], description: 'Preset Dramatique' },
    { keys: ['E'], description: 'Preset N&B' },
    { keys: ['R'], description: 'Preset Vintage' },
    { keys: ['A'], description: 'Toggle audio-réactivité' },
    { keys: ['C'], description: 'Toggle chromakey' },
    { keys: ['V'], description: 'Toggle VJ mode' },
    { keys: ['H'], description: 'Hide/Show panels' }
  ],
  'Calques': [
    { keys: ['Cmd/Ctrl', '↑'], description: 'Monter calque' },
    { keys: ['Cmd/Ctrl', '↓'], description: 'Descendre calque' },
    { keys: ['Cmd/Ctrl', '['], description: 'Blend mode précédent' },
    { keys: ['Cmd/Ctrl', ']'], description: 'Blend mode suivant' },
    { keys: ['1-9'], description: 'Set opacity 10%-90%' },
    { keys: ['0'], description: 'Set opacity 100%' }
  ]
}

export default useKeyboardShortcuts
