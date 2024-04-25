import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        if (res.status === 401) {
          setErrors(["Incorrect email or password"]);
        } else {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-modal">
      <form id="login-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <h2 className="login-form-title">Welcome Back!</h2>

        <label className="login-input-title" htmlFor="credential">
          Username or Email
        </label>
        <input
          id="credential"
          className="login-form-inputs"
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <label className="login-input-title" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="login-form-inputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-submit-button" type="submit">
          Log In
        </button>
        <button
          className="demo-login-submit-button"
          onClick={() => {
            setCredential("justin@user.io");
            setPassword("password");
          }}
          type="button"
        >
          Demo User Log In
        </button>
        <p className="create-account-text">
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
}

export default LoginFormModal;
