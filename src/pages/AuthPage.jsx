import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="auth-page">
      <section className="brand-panel">
        <div className="brand-content">
          <p className="eyebrow">Grade 5 Mathematics</p>
          <h1>Learn one question at a time.</h1>
          <p>
            Practice Algebra and Fractions with structured questions,
            immediate feedback, and clear progress tracking.
          </p>

          <div className="feature-list">
            <span>Algebra</span>
            <span>Fractions</span>
            <span>Three difficulty levels</span>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-card">
          {showRegister ? (
            <RegisterForm onShowLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onShowRegister={() => setShowRegister(true)} />
          )}
        </div>
      </section>
    </main>
  );
}
