import dissonanceVideo from '../assets/videos/dissonance-loop.mp4';
import profondeurVideo from '../assets/videos/profondeur-loop.mp4';
import mojonanceVideo from '../assets/videos/mojonance-loop.mp4';

const videoMap = {
  dissonance: dissonanceVideo,
  profondeur: profondeurVideo,
  mojonance: mojonanceVideo,
};

const VideoSampler = ({ emojis }) => {
  if (!emojis) return null;

  const playlist = ['dissonance', 'profondeur', 'mojonance']
    .map((category) => ({
      category,
      emoji: emojis[category],
      src: videoMap[category],
    }))
    .filter((item) => item.emoji);

  return (
    <div className="video-grid">
      {playlist.map(({ category, emoji, src }) => (
        <div key={category} className="video-card">
          <video src={src} autoPlay loop muted playsInline />
          <span>{emoji}</span>
        </div>
      ))}
    </div>
  );
};

export default VideoSampler;
