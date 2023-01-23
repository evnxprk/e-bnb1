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
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.length > 0 &&
            errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>

        <h1 className="login-title">Log In</h1>
        <label className="username-input">
          Username or Email
          <input
            className="username-input-box"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="password-input">
          Password
          <input
            className="pw-input-box"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-button" type="submit">
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
          {" "}
          Demo User Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
