import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../components/Box.jsx';
import EmojiPicker from '../components/EmojiPicker.jsx';

const Tirage = () => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    dissonance: null,
    profondeur: null,
    mojonance: null,
  });

  const handleSelect = (category) => (emoji) => {
    setSelection((prev) => ({ ...prev, [category]: emoji }));
  };

  const ready = Object.values(selection).every(Boolean);

  const footer = (
    <button
      type="button"
      className="primary-btn"
      disabled={!ready}
      onClick={() =>
        navigate('/haiku', {
          state: {
            selections: selection,
          },
        })
      }
    >
      Générer un haïku
    </button>
  );

  return (
    <Box title="Tirage" footer={footer}>
      <p>Choisissez un symbole dans chaque famille pour créer votre combinaison.</p>
      <div className="emoji-pickers">
        <EmojiPicker category="dissonance" onSelect={handleSelect('dissonance')} selected={selection.dissonance} />
        <EmojiPicker category="profondeur" onSelect={handleSelect('profondeur')} selected={selection.profondeur} />
        <EmojiPicker category="mojonance" onSelect={handleSelect('mojonance')} selected={selection.mojonance} />
      </div>
    </Box>
  );
};

export default Tirage;
