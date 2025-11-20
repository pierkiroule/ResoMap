import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import { generateHaiku } from '../components/HaikuGenerator.jsx';

const Haiku = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selections = state?.selections;

  useEffect(() => {
    if (!selections) {
      navigate('/tirage', { replace: true });
    }
  }, [navigate, selections]);

  const haiku = useMemo(() => generateHaiku(), [selections]);

  if (!selections) return null;

  const footer = (
    <button
      type="button"
      className="primary-btn"
      onClick={() =>
        navigate('/triptyque', {
          state: {
            selections,
            haiku,
          },
        })
      }
    >
      Continuer
    </button>
  );

  return (
    <Box title="Haïku" footer={footer}>
      <p>Les mots vibrent avec vos symboles.</p>
      <div className="haiku-lines">
        {haiku.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </Box>
  );
};

export default Haiku;
