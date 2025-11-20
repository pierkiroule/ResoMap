import { useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import EmojiPicker from '../components/EmojiPicker.jsx';
import { useFlow } from '../context/FlowContext.jsx';

const Tirage = () => {
  const navigate = useNavigate();
  const { selections, updateSelection } = useFlow();

  const handleSelect = (category) => (emoji) => {
    updateSelection(category, emoji);
  };

  const ready = Object.values(selections).every(Boolean);

  const footer = (
    <button
      type="button"
      className="primary-btn"
      disabled={!ready}
      onClick={() => navigate('/haiku')}
    >
      Générer un haïku
    </button>
  );

  return (
    <Box title="Tirage" footer={footer}>
      <p>Choisissez un symbole dans chaque famille pour créer votre combinaison.</p>
      <div className="emoji-pickers">
        <EmojiPicker category="dissonance" onSelect={handleSelect('dissonance')} selected={selections.dissonance} />
        <EmojiPicker category="profondeur" onSelect={handleSelect('profondeur')} selected={selections.profondeur} />
        <EmojiPicker category="mojonance" onSelect={handleSelect('mojonance')} selected={selections.mojonance} />
      </div>
    </Box>
  );
};

export default Tirage;
