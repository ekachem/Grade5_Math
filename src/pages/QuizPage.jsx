import { useEffect, useMemo, useState } from "react";
import {
  generateQuestions,
  isAnswerCorrect,
} from "../questions/questionGenerator";

const topicNames = {
  algebra: "Algebra",
  fractions: "Fractions",
};

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function QuizPage({
  topic,
  difficulty,
  onComplete,
  onExit,
}) {
  const questions = useMemo(
    () => generateQuestions(topic, difficulty, 10),
    [topic, difficulty]
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  useEffect(() => {
    setUserAnswer("");
    setFeedback(null);
  }, [questionIndex]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!userAnswer.trim() || feedback) {
      return;
    }

    const correct = isAnswerCorrect(
      userAnswer,
      currentQuestion.answer,
      currentQuestion.answerType
    );

    const result = {
      questionId: currentQuestion.id,
      prompt: currentQuestion.prompt,
      submittedAnswer: userAnswer.trim(),
      correctAnswer: currentQuestion.answer,
      correct,
    };

    setResults((previousResults) => [...previousResults, result]);

    setFeedback({
      correct,
      message: correct
        ? "Correct!"
        : `Not quite. The correct answer is ${currentQuestion.answer}.`,
    });
  }

  function handleNext() {
    if (!feedback) {
      return;
    }

    if (isLastQuestion) {
      const finalResults = [
        ...results,
      ];

      const score = finalResults.filter(
        (result) => result.correct
      ).length;

      onComplete({
        topic,
        difficulty,
        score,
        totalQuestions: questions.length,
        results: finalResults,
      });

      return;
    }

    setQuestionIndex((previousIndex) => previousIndex + 1);
  }

  const completedCount = questionIndex;
  const progressPercentage =
    ((completedCount + 1) / questions.length) * 100;

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <div>
          <p className="app-name">Grade 5 Mathematics</p>
          <p className="quiz-meta">
            {topicNames[topic]} · {difficultyNames[difficulty]}
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={onExit}
        >
          Exit practice
        </button>
      </header>

      <section className="quiz-container">
        <div className="progress-information">
          <span>
            Question {questionIndex + 1} of {questions.length}
          </span>

          <span>{Math.round(progressPercentage)}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <section className="question-card">
          <p className="question-instruction">
            {currentQuestion.instruction}
          </p>

          <h1 className="question-prompt">
            {currentQuestion.prompt}
          </h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="quiz-answer">
              Your answer
            </label>

            <input
              id="quiz-answer"
              className="answer-input"
              type="text"
              value={userAnswer}
              onChange={(event) => setUserAnswer(event.target.value)}
              placeholder={
                currentQuestion.answerType === "fraction"
                  ? "Example: 3/4"
                  : "Enter a number"
              }
              autoComplete="off"
              disabled={Boolean(feedback)}
              autoFocus
            />

            {!feedback && (
              <button
                className="primary-button quiz-action-button"
                type="submit"
                disabled={!userAnswer.trim()}
              >
                Check answer
              </button>
            )}
          </form>

          {feedback && (
            <div
              className={`answer-feedback ${
                feedback.correct
                  ? "answer-feedback-correct"
                  : "answer-feedback-incorrect"
              }`}
            >
              <strong>{feedback.message}</strong>

              <button
                type="button"
                className="primary-button quiz-action-button"
                onClick={handleNext}
              >
                {isLastQuestion
                  ? "View results"
                  : "Next question"}
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
