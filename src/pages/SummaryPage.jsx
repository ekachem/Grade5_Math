const topicNames = {
  algebra: "Algebra",
  fractions: "Fractions",
};

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function SummaryPage({
  session,
  onPracticeAgain,
  onReturnHome,
}) {
  const percentage = Math.round(
    (session.score / session.totalQuestions) * 100
  );

  let message = "Keep practicing—you are making progress.";

  if (percentage === 100) {
    message = "Perfect score! Excellent work.";
  } else if (percentage >= 80) {
    message = "Great work! You understand this topic well.";
  } else if (percentage >= 60) {
    message = "Good effort. A little more practice will help.";
  }

  return (
    <main className="summary-page">
      <section className="summary-card">
        <p className="eyebrow">Practice complete</p>

        <h1>Your score</h1>

        <div className="score-circle">
          <span className="score-number">{session.score}</span>
          <span className="score-total">
            out of {session.totalQuestions}
          </span>
        </div>

        <p className="score-percentage">{percentage}%</p>
        <p className="summary-message">{message}</p>

        <div className="session-details">
          <div>
            <span>Topic</span>
            <strong>{topicNames[session.topic]}</strong>
          </div>

          <div>
            <span>Difficulty</span>
            <strong>{difficultyNames[session.difficulty]}</strong>
          </div>

          <div>
            <span>Correct</span>
            <strong>{session.score}</strong>
          </div>

          <div>
            <span>Incorrect</span>
            <strong>
              {session.totalQuestions - session.score}
            </strong>
          </div>
        </div>

        <section className="answer-review">
          <h2>Answer review</h2>

          <div className="answer-review-list">
            {session.results.map((result, index) => (
              <article
                key={result.questionId}
                className={`review-item ${
                  result.correct
                    ? "review-item-correct"
                    : "review-item-incorrect"
                }`}
              >
                <div>
                  <p className="review-question-number">
                    Question {index + 1}
                  </p>

                  <p className="review-prompt">
                    {result.prompt}
                  </p>
                </div>

                <div className="review-answer">
                  <span>
                    Your answer:{" "}
                    <strong>{result.submittedAnswer}</strong>
                  </span>

                  {!result.correct && (
                    <span>
                      Correct answer:{" "}
                      <strong>{result.correctAnswer}</strong>
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="summary-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onReturnHome}
          >
            Choose another topic
          </button>

          <button
            type="button"
            className="primary-button summary-primary-button"
            onClick={onPracticeAgain}
          >
            Practice again
          </button>
        </div>
      </section>
    </main>
  );
}
