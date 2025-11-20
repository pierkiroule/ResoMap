import { useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import { useFlow } from '../context/FlowContext.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { selections, haiku, hasCompleteSelection, resetFlow } = useFlow();

  const hasSelections = Object.values(selections).some(Boolean);
  const hasHaiku = Array.isArray(haiku) && haiku.length > 0;
  const hasProgress = hasSelections || hasHaiku;

  const resumeTarget = hasHaiku ? '/triptyque' : hasCompleteSelection ? '/haiku' : '/tirage';

  const handleStart = () => {
    resetFlow();
    navigate('/tirage');
  };

  const handleResume = () => {
    navigate(resumeTarget);
  };

  const footer = (
    <>
      <button type="button" className="primary-btn" onClick={handleStart}>
        Entrer dans le rêve
      </button>
      {hasProgress && (
        <button type="button" className="secondary-btn" onClick={handleResume}>
          Reprendre le flux
        </button>
      )}
    </>
  );

  return (
    <Box title="Resomap" footer={footer}>
      <p>Un voyage tactile qui compose poèmes, images et textures audiovisuelles à partir de trois archétypes émotionnels.</p>
      <p>Choisissez vos émotions et laissez le flux génératif vous guider.</p>
    </Box>
  );
};

export default Home;
