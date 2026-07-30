import { useState } from "react";
import DifficultySelector from "../components/DifficultySelector";
import TopicSelector from "../components/TopicSelector";
import { useAuth } from "../context/AuthContext";

const topicNames = {
  algebra: "Algebra",
  fractions: "Fractions",
};

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function HomePage({ onStartPractice }) {
  const { currentUser, logout } = useAuth();

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [logoutError, setLogoutError] = useState("");

  function handleTopicSelection(topic) {
    setSelectedTopic(topic);

    // Reset difficulty whenever the student changes topics.
    setSelectedDifficulty("");
  }

  function handleStartPractice() {
    if (!selectedTopic || !selectedDifficulty) {
      return;
   }

  onStartPractice({
    topic: selectedTopic,
    difficulty: selectedDifficulty,
  });
 }
  async function handleLogout() {
    setLogoutError("");

    try {
      await logout();
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    }
  }

  const canStart = Boolean(selectedTopic && selectedDifficulty);

  return (
    <main className="home-page">
      <header className="app-header">
        <div>
          <p className="app-name">Grade 5 Mathematics</p>
          <p className="welcome-message">
            Signed in as <strong>{currentUser?.email}</strong>
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </header>

      <section className="home-hero">
        <p className="eyebrow">Practice session</p>
        <h1>What would you like to practice?</h1>
        <p>
          Choose a mathematics topic and difficulty level. Each practice
          session will contain 10 questions.
        </p>
      </section>

      {logoutError && <div className="form-error">{logoutError}</div>}

      <TopicSelector
        selectedTopic={selectedTopic}
        onSelectTopic={handleTopicSelection}
      />

      <DifficultySelector
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        disabled={!selectedTopic}
      />

      <section className="practice-summary">
        <div>
          <p className="summary-label">Your selection</p>

          {canStart ? (
            <p className="summary-selection">
              {topicNames[selectedTopic]} ·{" "}
              {difficultyNames[selectedDifficulty]} · 10 questions
            </p>
          ) : (
            <p className="summary-placeholder">
              Select a topic and difficulty to continue.
            </p>
          )}
        </div>

        <button
          type="button"
          className="primary-button start-button"
          disabled={!canStart}
          onClick={handleStartPractice}
        >
          Start practice
        </button>
      </section>
    </main>
  );
}
