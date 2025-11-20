import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Tirage from './pages/Tirage.jsx';
import Haiku from './pages/Haiku.jsx';
import Triptyque from './pages/Triptyque.jsx';
import AudioMix from './pages/AudioMix.jsx';
import VideoMix from './pages/VideoMix.jsx';
import CosmojiPage from './pages/Cosmoji.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        <Link to="/">Resomap</Link>
        <div>
          <Link to="/tirage">Tirage</Link>
          <Link to="/haiku">Haïku</Link>
          <Link to="/triptyque">Triptyque</Link>
          <Link to="/audiomix">Audio</Link>
          <Link to="/videomix">Vidéo</Link>
        </div>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tirage" element={<Tirage />} />
          <Route path="/haiku" element={<Haiku />} />
          <Route path="/triptyque" element={<Triptyque />} />
          <Route path="/audiomix" element={<AudioMix />} />
          <Route path="/videomix" element={<VideoMix />} />
          <Route path="/cosmoji" element={<CosmojiPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
