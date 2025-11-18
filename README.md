# 🌙 Resomap - Professional VJ Suite

**Resomap** est un générateur multimédia professionnel pour le **VJing en temps réel**, inspiré de **Resolume** et **Ableton Live**. Créez des compositions visuelles époustouflantes avec audio-réactivité, effects, chromakey, et interaction tactile en direct.

---

## ✨ Features

### 🎨 **Professional Layout (Resolume/Ableton Style)**
- **Clip Browser** (gauche) : Gérez vos calques avec miniatures et color-coding par type
- **Composition View** (centre) : Viewer principal avec contrôles fullscreen
- **Inspector** (droite) : Panneaux organisés en tabs pour édition avancée
- **Timeline** (bas, optionnel) : Pour automation et playback (coming soon)
- **Resizable panels** : Ajustez les zones selon vos besoins

### 🎨 **Multi-Layer System**
- Import de médias hétérogènes : **images, vidéos, GIFs, audio**
- **Superposition** et **réorganisation** de calques
- **Color coding** par type (Resolume style) :
  - 🔴 Vidéo = Rouge
  - 🔵 Image = Bleu
  - 🟢 Audio = Vert
  - 🟠 GIF = Orange

### 🌈 **Advanced Visual Effects**
- **CSS Filters** : Blur, Brightness, Contrast, Saturate, Hue Rotate, Grayscale, Sepia, Invert
- **Filter Presets** : Vibrant, Dramatique, N&B, Vintage (shortcuts Q/W/E/R)
- **Blend Modes** : Normal, Multiply, Screen, Overlay, Color-Dodge, Hard-Light, etc.
- **Chromakey** : Incrustation fond vert avec contrôles avancés (seuil, smoothness)
- **Transform controls** : Opacity, Scale, Rotation, Position

### 🎵 **Audio-Reactivity (Resolume-Inspired)**
- **Web Audio API** : Analyse fréquentielle en temps réel
- **4 bandes** : Bass, Mid, High, Overall
- **Mappable parameters** : Chaque effet peut être lié à une fréquence
- **Intensity & Range** : Min/Max configurable pour chaque paramètre
- **Real-time visualization** : Barres audio en live

### 🎭 **VJ Performance Mode**
- **Tactile VJing** : Manipulation directe des calques par touch/mouse
  - **Drag** : 1 doigt / clic gauche (déplacer)
  - **Pinch** : 2 doigts (scale)
  - **Rotate** : 2 doigts (rotation)
  - **Scroll** : Zoom, Rotate (Shift), Blur (Ctrl)
- **Audio-reactive gestures** : Les manipulations sont modulées par l'audio en temps réel
- **Mode fullscreen** : Viewer plein écran (touche `F`)
- **Performance hints** : Instructions en overlay

### 🎥 **Loop Video Recorder**
- **Capture 10 secondes** : Enregistrement du flux viewer avec countdown
- **Ping-Pong Loop** : Lecture forward → reverse automatique
- **Export formats** : GIF animé, MP4, WebM
- **Gallery** : Preview et téléchargement des loops enregistrés

### ⌨️ **Keyboard Shortcuts Pro**
Tous les raccourcis clavier d'un logiciel professionnel ! (Appuyez sur `?` pour afficher)

#### Navigation
- `Tab` : Cycle entre zones
- `Cmd/Ctrl + 1-9` : Sélection rapide calque
- `F` : Fullscreen viewer
- `Esc` : Exit fullscreen

#### Édition
- `Delete/Backspace` : Supprimer calque
- `Cmd/Ctrl + D` : Dupliquer
- `Cmd/Ctrl + Z/Y` : Undo/Redo
- `Cmd/Ctrl + S` : Save snapshot
- `Cmd/Ctrl + R` : Start/Stop recording

#### Performance (Presets & FX)
- `Q` : Preset Vibrant
- `W` : Preset Dramatique
- `E` : Preset N&B
- `R` : Preset Vintage
- `A` : Toggle audio-réactivité
- `C` : Toggle chromakey
- `V` : Toggle VJ mode
- `H` : Hide/Show panels

#### Calques
- `Cmd/Ctrl + ↑/↓` : Réordonner calques
- `Cmd/Ctrl + [/]` : Cycle blend modes
- `1-9` : Set opacity 10%-90%
- `0` : Set opacity 100%

### 🎯 **Inspector avec Tabs**
Organisation professionnelle des contrôles par catégorie :

1. **🎨 Transform** : Opacity, Scale, Rotation, Position + Presets
2. **🌈 Effects** : Tous les filtres CSS + Presets visuels
3. **🎵 Audio** : Configuration audio-réactivité
4. **🔑 Keying** : Chromakey controls
5. **⚙️ Advanced** : Blend modes, visibility, layer order

### 📱 **Mobile-Optimized UX**
- **Responsive design** : Adaptation automatique mobile/tablet/desktop
- **Touch gestures** : Support complet multi-touch
- **Collapsible menus** : Panneaux optimisés pour petits écrans
- **Minimized modes** : Clip browser et inspector en mode icônes

### 📊 **Performance Recording**
- **Record/Playback** : Capture et rejoue tes performances
- **Snapshots** : Sauvegarde rapide de l'état des calques
- **Timeline** : Visualise et édite tes enregistrements (coming soon)

---

## 🚀 Quick Start

### Installation

```bash
npm install
npm run dev
```

Ouvre ton navigateur à `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## 🎨 Usage

### 1. **Import Media**
- Clique sur **"+ Import Media"** dans le header
- Sélectionne images, vidéos, GIFs, ou audio
- Tes clips apparaissent dans le **Clip Browser** (gauche)

### 2. **Edit Properties**
- Sélectionne un clip dans le Clip Browser
- Édite ses propriétés dans l'**Inspector** (droite)
- Utilise les **tabs** pour accéder aux différentes catégories d'effets

### 3. **Audio-Reactivity**
- Active un calque audio pour initialiser l'analyse
- Dans l'Inspector → Tab **Audio**, configure les paramètres
- Toggle audio-réactivité sur n'importe quel paramètre (Opacity, Scale, Rotation, etc.)

### 4. **VJ Performance**
- Active le mode performance (touche `V` ou bouton dans viewer)
- **Manipule directement** les calques avec la souris ou le touch
- Les effets audio-réactifs s'appliquent en temps réel

### 5. **Record Loops**
- Active le **Loop Recorder** dans le viewer
- Clique **"Start Capture"** (countdown 3s)
- Après 10s, ton loop ping-pong est créé
- Export en GIF ou MP4

### 6. **Keyboard Shortcuts**
- Appuie sur **`?`** pour afficher tous les raccourcis
- Utilise `Q/W/E/R` pour appliquer des presets rapidement
- `Cmd/Ctrl + 1-9` pour sélectionner un calque
- `F` pour fullscreen, `Esc` pour sortir

---

## 🎯 Design Philosophy

Resomap est conçu avec les principes UX de **Resolume** et **Ableton Live** :

✅ **Everything in 3 clicks max**
✅ **Visual feedback immédiat** (< 100ms)
✅ **Contextual help** (tooltips avec shortcuts)
✅ **Undo everything** (historique infini, coming soon)
✅ **Professional workflow** (zones dédiées, tabs, shortcuts)

Voir [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md) pour plus de détails.

---

## 📦 Tech Stack

- **React 18** : Framework UI
- **Vite** : Build tool ultra-rapide
- **Web Audio API** : Analyse audio temps réel
- **Canvas API** : Chromakey & frame processing
- **MediaRecorder API** : Capture vidéo
- **CSS3** : Filters, blend modes, animations
- **HTML5 Media** : Lecture vidéo/audio optimisée

---

## 🎪 Architecture

```
src/
├── App.jsx                        # Main app avec ProLayout
├── components/
│   ├── ProLayout.jsx              # Layout Resolume-style avec zones
│   ├── ClipBrowser.jsx            # Liste des calques avec color-coding
│   ├── TabsInspector.jsx          # Inspector avec tabs
│   ├── Viewer.jsx                 # Composition view
│   ├── Layer.jsx                  # Rendu d'un calque
│   ├── ShortcutsHelp.jsx          # Aide keyboard shortcuts
│   ├── AudioReactiveControl.jsx   # UI audio-réactivité
│   ├── TouchInteraction.jsx       # Gestures tactiles VJ mode
│   ├── VideoCapture.jsx           # Loop recorder
│   ├── PerformanceRecorder.jsx    # Recording performances
│   ├── FloatingPanel.jsx          # Panneaux draggables
│   └── MobileMenu.jsx             # Menus mobiles collapsibles
├── hooks/
│   └── useKeyboardShortcuts.js    # Hook pour shortcuts clavier
└── utils/
    ├── AudioAnalyzer.js           # Web Audio API wrapper
    └── GifEncoder.js              # Export GIF animé
```

---

## 🛠️ Roadmap

### Phase 1 ✅ (Current)
- ✅ Architecture Pro Layout (Resolume/Ableton style)
- ✅ Clip Browser avec color-coding
- ✅ Inspector avec tabs
- ✅ Keyboard shortcuts pro
- ✅ Audio-réactivité avancée
- ✅ VJ performance mode
- ✅ Loop video recorder
- ✅ Mobile UX optimization

### Phase 2 🔄 (Next)
- ⏱️ Timeline avec automation curves
- 🔄 Undo/Redo system (Cmd+Z/Y)
- 💾 Save/Load projects
- 🎨 Presets marketplace
- 📚 Templates library
- 🎬 Multi-scene management

### Phase 3 🚀 (Future)
- 🎹 MIDI mapping
- 🔌 OSC protocol
- 📡 NDI streaming
- 🤖 AI-powered effects
- 👥 Collaboration en temps réel
- ☁️ Cloud sync

Voir [VISION.md](./VISION.md) pour la vision complète.

---

## 🎨 Color System

### Brand Colors
- **Primary** : `#667eea` (Violet)
- **Secondary** : `#764ba2` (Purple)
- **Accent** : `#00ff88` (Green)
- **Warning** : `#ff3366` (Red)
- **Info** : `#3366ff` (Blue)

### Media Type Colors (Resolume style)
- **Vidéo** : `#ff3366` (Rouge)
- **Image** : `#3366ff` (Bleu)
- **Audio** : `#00ff88` (Vert)
- **GIF** : `#ffaa00` (Orange)

---

## 🤝 Contributing

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Crée une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

---

## 📄 License

MIT License - Fais ce que tu veux avec ce code ! 🎉

---

## 🙏 Credits

Inspiré par les meilleurs outils de VJing et production :
- **Resolume Avenue/Arena** : Layout & workflow pro
- **Ableton Live** : Inspector & shortcuts
- **TouchDesigner** : Node-based approach (future)
- **VDMX** : Real-time VJ performance

---

## 📬 Contact

Créé avec ❤️ pour la communauté VJ

**"Professional tools for creative minds"** 🎭✨

---

## 🎯 Keyboard Shortcuts Quick Reference

| Action | Shortcut | Description |
|--------|----------|-------------|
| **NAVIGATION** |
| Sélection rapide | `Cmd/Ctrl + 1-9` | Sélectionne le calque N |
| Fullscreen | `F` | Mode plein écran viewer |
| Exit fullscreen | `Esc` | Sortir du fullscreen |
| **ÉDITION** |
| Supprimer | `Delete` | Supprimer calque sélectionné |
| Dupliquer | `Cmd/Ctrl + D` | Dupliquer le calque |
| Undo | `Cmd/Ctrl + Z` | Annuler |
| Redo | `Cmd/Ctrl + Y` | Refaire |
| **PERFORMANCE** |
| Preset Vibrant | `Q` | Appliquer preset Vibrant |
| Preset Dramatique | `W` | Appliquer preset Dramatique |
| Preset N&B | `E` | Appliquer preset N&B |
| Preset Vintage | `R` | Appliquer preset Vintage |
| Toggle Chromakey | `C` | Activer/désactiver chromakey |
| **CALQUES** |
| Monter calque | `Cmd/Ctrl + ↑` | Monter dans la pile |
| Descendre calque | `Cmd/Ctrl + ↓` | Descendre dans la pile |
| Cycle blend mode | `Cmd/Ctrl + [/]` | Changer blend mode |
| Set opacity | `1-9, 0` | Opacité 10%-100% |
| **AIDE** |
| Shortcuts help | `?` | Afficher tous les raccourcis |

---

**Ready to create visual magic?** 🌙✨

```bash
npm run dev
```
