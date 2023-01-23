import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>


        <label id="login-form-title">LOGIN FORM</label>
        <label id="welcome-back-login">
         Welcome to Cloudy Nights!
        </label>

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
            setCredential("christy@user.io");
            setPassword("password");
          }}
          type="submit"
        >
          Demo User Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
