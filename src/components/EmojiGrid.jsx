import PropTypes from 'prop-types';

const cloudPath =
  'M66 148c-31 0-52-27-39-54C8 80 13 52 40 48c12-32 59-43 90-19c21-18 72-17 95 8c32-7 66 20 60 48c29 7 44 44 17 68c-19 22-67 20-86 2c-24 27-82 30-103 3c-12 13-32 20-47 20Z';

function EmojiGrid({ options, selected, onSelect }) {
  return (
    <div className="emoji-cloud" role="group" aria-label="Sélection d’emojis">
      <svg className="cloud-bg" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8f2ff" />
            <stop offset="50%" stopColor="#f1f6ff" />
            <stop offset="100%" stopColor="#fdf1ff" />
          </linearGradient>
          <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
            <feOffset dy="6" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={cloudPath} fill="url(#cloudGradient)" stroke="#efe7ff" strokeWidth="3" filter="url(#cloudShadow)" />
      </svg>

      <div className="emoji-bubbles">
        {options.map((option, index) => {
          const isActive = option.symbol === selected;
          return (
            <button
              type="button"
              key={option.symbol}
              className={`emoji-bubble${isActive ? ' selected' : ''}`}
              onClick={() => onSelect(option.symbol)}
              aria-pressed={isActive}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <span className="emoji-symbol" aria-hidden="true">
                {option.symbol}
              </span>
              <span className="emoji-label">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

EmojiGrid.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

EmojiGrid.defaultProps = {
  selected: '',
};

export default EmojiGrid;
