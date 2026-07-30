import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function getFirebaseErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-credential":
      return "The email or password is incorrect.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Unable to sign in. Please try again.";
  }
}

export default function LoginForm({ onShowRegister }) {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(formData.email.trim(), formData.password);
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>
      <p className="form-subtitle">
        Sign in to continue practicing Grade 5 math.
      </p>

      {error && <div className="form-error">{error}</div>}

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="current-password"
        minLength="6"
        required
      />

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="auth-switch">
        New student?{" "}
        <button type="button" className="text-button" onClick={onShowRegister}>
          Create an account
        </button>
      </p>
    </form>
  );
}
