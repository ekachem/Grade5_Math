import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const { currentUser, authLoading } = useAuth();

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

  return currentUser ? <HomePage /> : <AuthPage />;
}
