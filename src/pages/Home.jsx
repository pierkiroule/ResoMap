import { Link } from 'react-router-dom';
import Box from '../components/Box.jsx';

const Home = () => {
  return (
    <Box
      title="Resomap"
      footer={
        <Link className="primary-btn" to="/tirage">
          Entrer dans le rêve
        </Link>
      }
    >
      <p>Un voyage tactile qui compose poèmes, images et textures audiovisuelles à partir de trois archétypes émotionnels.</p>
      <p>Choisissez vos émotions et laissez le flux génératif vous guider.</p>
    </Box>
  );
};

export default Home;
