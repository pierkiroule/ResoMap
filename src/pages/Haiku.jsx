import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import { generateHaiku } from '../components/HaikuGenerator.jsx';
import { useFlow } from '../context/FlowContext.jsx';

const Haiku = () => {
  const navigate = useNavigate();
  const { haiku, setHaiku, hasCompleteSelection } = useFlow();

  useEffect(() => {
    if (!hasCompleteSelection) {
      navigate('/tirage', { replace: true });
      return;
    }
    if (!haiku) {
      setHaiku(generateHaiku());
    }
  }, [haiku, hasCompleteSelection, navigate, setHaiku]);

  if (!hasCompleteSelection) return null;

  if (!haiku) {
    return (
      <Box title="Haïku">
        <p>Invocation du haïku en cours...</p>
      </Box>
    );
  }

  const footer = (
    <button
      type="button"
      className="primary-btn"
      onClick={() => navigate('/triptyque')}
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
