# 🎨 Resomap - Design Philosophy (Resolume + Ableton Inspired)

## 🎯 Vision UX Professionnelle

Inspiré des meilleures pratiques de **Resolume** (VJing) et **Ableton Live** (DAW), l'interface Resomap est pensée pour la **performance en temps réel**.

## 📐 Architecture en Zones

### 1. **CLIP BROWSER** (Gauche - 300px)
Comme les **Clips** de Resolume
- Liste des calques avec miniatures
- Drag & drop pour réorganiser
- Color coding par type (vidéo=rouge, image=bleu, audio=vert)
- Preview au survol
- Shortcuts : `Cmd+1-9` pour sélection rapide

### 2. **COMPOSITION VIEW** (Centre)
Comme la **Sortie** de Resolume
- Viewer principal plein écran
- Overlay des niveaux audio
- Grid optionnel pour alignement
- Mode fullscreen : `F` ou double-clic
- FPS counter en coin

### 3. **INSPECTOR** (Droite - 320px)
Comme l'**Inspecteur** d'Ableton
- **Tabs organisés** :
  - 🎨 **Transform** : Opacité, Scale, Rotation, Position
  - 🌈 **Effects** : Filtres CSS groupés
  - 🎵 **Audio** : Audio-réactivité
  - 🔑 **Keying** : Chromakey
  - ⚙️ **Advanced** : Blend modes, etc.
- Collapsible sections
- Presets en haut de chaque tab
- Bouton "Reset" par section

### 4. **TIMELINE** (Bas - optionnel)
Comme la **Timeline** de Resolume
- Enregistrement performances
- Automation curves
- Markers & loops
- Scrub playback

## 🎨 Design Tokens

### Couleurs par fonction (Resolume-style)
- **Vidéo** : `#ff3366` (rouge)
- **Image** : `#3366ff` (bleu)
- **Audio** : `#00ff88` (vert)
- **GIF** : `#ffaa00` (orange)
- **Selected** : `#667eea` (violet glow)
- **Audio-reactive** : `#00ff88` (vert pulsant)

### États visuels clairs
- **Normal** : Border gris
- **Hover** : Border coloré + lift
- **Selected** : Glow + border épais
- **Disabled** : Opacity 0.5 + grayscale
- **Recording** : Red pulse
- **Playing** : Green pulse

## 🎹 Shortcuts Clavier (Pro workflow)

### Navigation
- `Tab` : Cycle entre zones
- `Cmd/Ctrl + 1-9` : Sélection rapide calque
- `Space` : Play/Pause
- `F` : Fullscreen viewer
- `Esc` : Exit fullscreen

### Édition
- `Delete/Backspace` : Supprimer calque
- `Cmd/Ctrl + D` : Dupliquer
- `Cmd/Ctrl + Z/Y` : Undo/Redo
- `Cmd/Ctrl + S` : Save snapshot
- `Cmd/Ctrl + R` : Start/Stop recording

### Performance
- `Q/W/E/R` : Quick presets (Vibrant, Dramatique, N&B, Vintage)
- `A` : Toggle audio-réactivité
- `C` : Toggle chromakey
- `V` : Toggle VJ mode
- `H` : Hide/Show panels (viewer only)

### Calques
- `Cmd/Ctrl + ↑/↓` : Réordonner calques
- `Cmd/Ctrl + [/]` : Cycle blend modes
- `1-9` : Set opacity 10%-90%
- `0` : Set opacity 100%

## 🎛️ Workflow Optimisé

### Mode Édition (Default)
```
┌──────────────────────────────────────┐
│  [Clip Browser]  [Viewer]  [Inspector]
│       300px        Flex       320px
└──────────────────────────────────────┘
```

### Mode Performance (Fullscreen)
```
┌──────────────────────────────────────┐
│              [Viewer]                 │
│           (Fullscreen)                │
│  [Mini inspector flottant en overlay] │
└──────────────────────────────────────┘
```

### Mode Recording
```
┌──────────────────────────────────────┐
│  [Clip Browser]  [Viewer]  [Inspector]
│  [───────── Timeline ────────]       │
└──────────────────────────────────────┘
```

## 🎪 Inspector Tabs détaillés

### Tab 1 : 🎨 Transform
```
[Presets: Normal | Centered | Fill | Fit]
────────────────────────────
Opacity    ▓▓▓▓▓▓▓▓▓░  90%
Scale      ▓▓▓▓▓░░░░░  1.2x
Rotation   ▓░░░░░░░░░  45°
Position   X: 100  Y: 50
────────────────────────────
[🔊 Audio-Reactive] [Reset]
```

### Tab 2 : 🌈 Effects
```
[☀️ Vibrant][🌙 Dramatique][⚫ N&B][📜 Vintage]
────────────────────────────
☐ Blur        ░░░░░░░░░░  0px
☑ Brightness  ▓▓▓▓▓▓▓░░░  80%
☑ Contrast    ▓▓▓▓▓▓▓▓▓▓  120%
☐ Saturate    ▓▓▓▓▓░░░░░  100%
────────────────────────────
[🔊 Audio-Reactive] [Reset All]
```

### Tab 3 : 🎵 Audio
```
Source:  [● Bass ▼]
────────────────────────────
🔊 ▓▓▓▓▓▓▓░░░  Bass    75%
🎸 ▓▓▓▓░░░░░░  Mid     40%
🎹 ▓▓░░░░░░░░  High    20%
────────────────────────────
Map to:
☑ Scale      (Min: 0.8  Max: 1.5)
☑ Rotation   (Min: 0    Max: 360)
☐ Opacity    (Min: 0    Max: 1)
────────────────────────────
Intensity:  ▓▓▓▓▓▓▓▓░░  1.5x
```

### Tab 4 : 🔑 Keying
```
☐ Enable Chromakey
────────────────────────────
Key Color:   [#00ff00] 🎨
Threshold:   ▓▓▓▓▓░░░░░  40%
Smoothness:  ▓▓░░░░░░░░  10%
────────────────────────────
[Eyedropper] [Preview Mask]
```

### Tab 5 : ⚙️ Advanced
```
Blend Mode:  [Overlay ▼]
────────────────────────────
☑ Visible
☑ Solo (hide others)
☐ Lock position
☐ Lock properties
────────────────────────────
Layer Order: 3 of 5
[Move Up ⬆] [Move Down ⬇]
```

## 🎯 Principes d'Accessibilité

### 1. **Everything in 3 clicks max**
- Aucune fonction ne doit nécessiter plus de 3 clics

### 2. **Visual feedback immédiat**
- Chaque action = feedback visuel < 100ms

### 3. **Contextual help**
- Hover tooltips avec shortcuts
- Status bar en bas avec hints

### 4. **Undo everything**
- Historique infini
- Cmd+Z fonctionne partout

### 5. **Save everywhere**
- Auto-save toutes les 30s
- Snapshots rapides (Cmd+S)
- Export presets

## 🚀 Performance Mode

### Entrée en mode perf : `V` ou `F11`
- Clip browser devient mini (40px width) avec icônes only
- Inspector devient floating & minimisé
- Viewer fullscreen
- Audio meters toujours visibles
- Mini controls en overlay (fade out après 3s)

### Controls overlay (auto-hide)
```
┌────────────────────────────────────┐
│ [VJ Mode] [Rec●] [FX] [⚙️]  [✕]   │  ← Top bar
│                                    │
│                                    │
│          [Viewer Fullscreen]       │
│                                    │
│                                    │
│ 🔊▓▓▓ 🎸▓░░ 🎹░░░        [Props⚙️] │  ← Bottom bar
└────────────────────────────────────┘
```

## 📱 Mobile Adaptation

### Portrait (< 480px)
```
┌──────────┐
│  Viewer  │
├──────────┤
│ [Tabs]   │
│ Clips/FX │
└──────────┘
```

### Landscape (< 768px)
```
┌────────────────────┐
│ [Clips] [Viewer]   │
│  (40%)    (60%)    │
└────────────────────┘
[Floating Inspector]
```

## 🎨 Color System

### Brand Colors
- Primary: `#667eea` (Violet)
- Secondary: `#764ba2` (Purple)
- Accent: `#00ff88` (Green)
- Warning: `#ff3366` (Red)
- Info: `#3366ff` (Blue)

### Backgrounds
- Dark: `#1a1a2e` (Main bg)
- Panel: `#16213e` (Panels)
- Card: `#0f3460` (Cards)

### States
- Hover: +20% brightness
- Active: +40% brightness + glow
- Disabled: 50% opacity + grayscale

## 🎯 Next Level Features

### Phase 1 ✅
- Zones dédiées
- Tabs inspector
- Shortcuts clavier
- Color coding
- Floating panels

### Phase 2 🔄
- Timeline avec automation
- Undo/Redo system
- Presets marketplace
- Templates library

### Phase 3 🚀
- MIDI mapping
- OSC protocol
- Multi-output
- NDI streaming

---

**"Professional tools for creative minds"** 🎭✨
