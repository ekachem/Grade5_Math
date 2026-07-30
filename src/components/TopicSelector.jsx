const topics = [
  {
    id: "algebra",
    title: "Algebra",
    icon: "x",
    description:
      "Solve number sentences, find unknown values, and understand patterns.",
    examples: ["x + 5 = 12", "3 × x = 18", "Find the missing number"],
  },
  {
    id: "fractions",
    title: "Fractions",
    icon: "½",
    description:
      "Compare, simplify, add, and subtract fractions.",
    examples: ["1/2 + 1/4", "Compare 3/5 and 2/5", "Simplify 4/8"],
  },
];

export default function TopicSelector({ selectedTopic, onSelectTopic }) {
  return (
    <section className="selection-section">
      <div className="section-heading">
        <p className="step-label">Step 1</p>
        <h2>Choose a topic</h2>
        <p>Select the area you want to practice.</p>
      </div>

      <div className="topic-grid">
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;

          return (
            <button
              key={topic.id}
              type="button"
              className={`topic-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectTopic(topic.id)}
              aria-pressed={isSelected}
            >
              <span className="topic-icon">{topic.icon}</span>

              <span className="topic-content">
                <span className="topic-title">{topic.title}</span>
                <span className="topic-description">{topic.description}</span>

                <span className="topic-examples">
                  {topic.examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </span>
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
