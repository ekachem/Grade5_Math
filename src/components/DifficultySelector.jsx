const difficulties = [
  {
    id: "easy",
    title: "Easy",
    description: "Build confidence with basic questions.",
  },
  {
    id: "medium",
    title: "Medium",
    description: "Practice questions with multiple steps.",
  },
  {
    id: "hard",
    title: "Hard",
    description: "Challenge yourself with advanced questions.",
  },
];

export default function DifficultySelector({
  selectedDifficulty,
  onSelectDifficulty,
  disabled,
}) {
  return (
    <section
      className={`selection-section ${
        disabled ? "selection-section-disabled" : ""
      }`}
    >
      <div className="section-heading">
        <p className="step-label">Step 2</p>
        <h2>Choose a difficulty</h2>
        <p>
          {disabled
            ? "Choose a topic first."
            : "Select the question difficulty."}
        </p>
      </div>

      <div className="difficulty-grid">
        {difficulties.map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty.id;

          return (
            <button
              key={difficulty.id}
              type="button"
              className={`difficulty-card ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => onSelectDifficulty(difficulty.id)}
              disabled={disabled}
              aria-pressed={isSelected}
            >
              <span className="difficulty-title">{difficulty.title}</span>
              <span className="difficulty-description">
                {difficulty.description}
              </span>
              <span className="selection-indicator">
                {isSelected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
