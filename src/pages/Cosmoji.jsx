import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import CosmojiGraph from '../components/Cosmoji.jsx';

const Cosmoji = () => {
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
    <>
      <Link className="primary-btn" to="/">
        Recommencer
      </Link>
    </>
  );

  return (
    <Box title="Cosmoji" footer={footer}>
      <p>Résumé cosmique de votre trajectoire.</p>
      <CosmojiGraph emojis={selections} haiku={haiku} />
    </Box>
  );
};

export default Cosmoji;
