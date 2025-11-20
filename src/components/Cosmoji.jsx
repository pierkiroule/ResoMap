const labels = {
  dissonance: 'Dissonance',
  profondeur: 'Profondeur',
  mojonance: 'Mojonance',
};

const CosmojiGraph = ({ emojis, haiku }) => {
  if (!emojis) return null;

  const nodes = [
    { key: 'dissonance', className: 'node-a' },
    { key: 'profondeur', className: 'node-b' },
    { key: 'mojonance', className: 'node-c' },
  ];

  return (
    <div>
      <div className="cosmoji-graph">
        <div className="cosmoji-lines">
          <span />
        </div>
        {nodes.map(({ key, className }) => (
          <div key={key} className={`cosmoji-node ${className}`}>
            <span>{emojis[key]}</span>
            <label>{labels[key]}</label>
          </div>
        ))}
      </div>
      {haiku && (
        <p>
          {haiku.join(' • ')}
        </p>
      )}
    </div>
  );
};

export default CosmojiGraph;
