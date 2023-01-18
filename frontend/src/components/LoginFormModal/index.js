import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!credential || credential.length < 4 || credential > 30)
      errors.push(
        "Please enter valid credentials. Credentials must be more than 4 and less than 30 characters."
      );
    if (!password || password.length < 4 || password > 30)
      errors.push("Please enter valid password.");

    setValidationErrors(errors);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-modal">
      <form id="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div className="errors-login-form">
          {validationErrors.length > 0 && (
            <ul className="login-errors">
              {validationErrors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </div>

        <label id="login-form-title">LOGIN FORM</label>
        <p> 
          
        </p>

        <label id="login-input-title">Username or Email</label>
        <input
          id="login-form-inputs"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <label id="login-input-title">Password</label>
        <input
          id="login-form-inputs"
          type="password"
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
            setCredential("demo@user.io");
            setPassword("password");
          }}
          type="submit"
        >
          Demo User Log In
        </button>
      </form>
    </div>
  );
};
export default LoginForm;