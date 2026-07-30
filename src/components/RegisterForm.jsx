import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function getFirebaseErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account already exists for this email address.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "The password must contain at least 6 characters.";
    default:
      return "Unable to create the account. Please try again.";
  }
}

export default function RegisterForm({ onShowLogin }) {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await register(
        formData.email.trim(),
        formData.password,
        formData.displayName
      );
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      <p className="form-subtitle">
        Start practicing Algebra and Fractions.
      </p>

      {error && <div className="form-error">{error}</div>}

      <label htmlFor="register-name">Student name</label>
      <input
        id="register-name"
        name="displayName"
        type="text"
        value={formData.displayName}
        onChange={handleChange}
        autoComplete="name"
        required
      />

      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        minLength="6"
        required
      />

      <label htmlFor="confirm-password">Confirm password</label>
      <input
        id="confirm-password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        minLength="6"
        required
      />

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </button>

      <p className="auth-switch">
        Already registered?{" "}
        <button type="button" className="text-button" onClick={onShowLogin}>
          Sign in
        </button>
      </p>
    </form>
  );
}
