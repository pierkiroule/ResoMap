import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import VideoSampler from '../components/VideoSampler.jsx';

const VideoMix = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selections = state?.selections;
  const haiku = state?.haiku;

  useEffect(() => {
    if (!selections) {
      navigate('/tirage', { replace: true });
    }
  }, [navigate, selections]);

  if (!selections) return null;

  const footer = (
    <button
      type="button"
      className="primary-btn"
      onClick={() =>
        navigate('/cosmoji', {
          state: {
            selections,
            haiku,
          },
        })
      }
    >
      Vers Cosmoji
    </button>
  );

  return (
    <Box title="Video Mix" footer={footer}>
      <VideoSampler emojis={selections} />
    </Box>
  );
};

export default VideoMix;
