import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import TriptyqueViewer from '../components/TriptyqueViewer.jsx';

const Triptyque = () => {
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
        navigate('/audiomix', {
          state: {
            selections,
            haiku,
          },
        })
      }
    >
      Vers l'audio
    </button>
  );

  return (
    <Box title="Triptyque" footer={footer}>
      <TriptyqueViewer
        emoji1={selections.dissonance}
        emoji2={selections.profondeur}
        emoji3={selections.mojonance}
      />
    </Box>
  );
};

export default Triptyque;
