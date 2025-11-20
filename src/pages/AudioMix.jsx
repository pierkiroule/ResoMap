import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import AudioSampler from '../components/AudioSampler.jsx';

const AudioMix = () => {
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
        navigate('/videomix', {
          state: {
            selections,
            haiku,
          },
        })
      }
    >
      Vers la vidéo
    </button>
  );

  return (
    <Box title="Audio Mix" footer={footer}>
      <AudioSampler emojis={selections} />
    </Box>
  );
};

export default AudioMix;
