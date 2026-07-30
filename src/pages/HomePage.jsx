import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="eyebrow">Grade 5 Mathematics</p>
        <h1>You are signed in.</h1>

        <p className="signed-in-email">
          Account: <strong>{currentUser?.email}</strong>
        </p>

        <p>
          Firebase Authentication is working. The next step will be adding the
          Algebra and Fractions topic selection page.
        </p>

        {error && <div className="form-error">{error}</div>}

        <button className="primary-button logout-button" onClick={handleLogout}>
          Sign out
        </button>
      </section>
    </main>
  );
}
