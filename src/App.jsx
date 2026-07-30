import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import SummaryPage from "./pages/SummaryPage";
import { useAuth } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const { currentUser, authLoading } = useAuth();

  const [screen, setScreen] = useState("home");
  const [quizSettings, setQuizSettings] = useState(null);
  const [completedSession, setCompletedSession] = useState(null);
  const [sessionNumber, setSessionNumber] = useState(0);

  function handleStartPractice(settings) {
    setQuizSettings(settings);
    setCompletedSession(null);
    setSessionNumber((previous) => previous + 1);
    setScreen("quiz");
  }

  function handleQuizComplete(session) {
    setCompletedSession(session);
    setScreen("summary");
  }

  function handlePracticeAgain() {
    if (!quizSettings) {
      setScreen("home");
      return;
    }

    setCompletedSession(null);
    setSessionNumber((previous) => previous + 1);
    setScreen("quiz");
  }

  function handleReturnHome() {
    setQuizSettings(null);
    setCompletedSession(null);
    setScreen("home");
  }

  if (authLoading) {
    return (
      <main className="loading-page">
        <div className="loading-card">
          <div className="spinner" />
          <p>Loading Grade 5 Math...</p>
        </div>
      </main>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  if (screen === "quiz" && quizSettings) {
    return (
      <QuizPage
        key={sessionNumber}
        topic={quizSettings.topic}
        difficulty={quizSettings.difficulty}
        onComplete={handleQuizComplete}
        onExit={handleReturnHome}
      />
    );
  }

  if (screen === "summary" && completedSession) {
    return (
      <SummaryPage
        session={completedSession}
        onPracticeAgain={handlePracticeAgain}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return <HomePage onStartPractice={handleStartPractice} />;
}
