import { emojis } from '../data/emojis.js';

const categoryLabels = {
  dissonance: 'Dissonance',
  profondeur: 'Profondeur',
  mojonance: 'Mojonance',
};

const EmojiPicker = ({ category, onSelect, selected }) => {
  const list = emojis[category] ?? [];

  return (
    <div className="emoji-picker">
      <h3>{categoryLabels[category] || category}</h3>
      <div className="emoji-grid">
        {list.map((emoji) => (
          <button
            type="button"
            key={emoji}
            className={selected === emoji ? 'selected' : ''}
            onClick={() => onSelect?.(emoji)}
            aria-pressed={selected === emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
