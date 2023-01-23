import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css'
import validator from 'validator'


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!validator.isEmail(email)) {
     setErrors([...errors, "invalid email format"]);
     return;
   }
   if (password !== confirmPassword) {
     setErrors([...errors, "Passwords do not match"]);
     return;
   }
   setErrors([]);

   return dispatch(
     sessionActions.signup({ email, username, firstName, lastName, password })
   )
     .then(() => {
       closeModal();
     })
     .catch(async (error) => {
       if (
         error.response &&
         error.response.data &&
         error.response.data.errors
       ) {
         setErrors(error.response.data.errors);
       }
     });
 };



  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, classNamex) => (
          <li key={classNamex}>{error}</li>
        ))}
      </ul>

      <label className="signup-form-title">Sign Up Here!</label>
      <label className="welcome-signup">Welcome to Cloudy Nights!</label>

      <label className="signup-input-title">First Name</label>
      <input
        className="signup-form-inputs"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <label className="signup-input-title">Last Name</label>
      <input
        className="signup-form-inputs"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label className="signup-input-title">Email</label>
      <input
        className="signup-form-inputs"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="signup-input-title">Username</label>
      <input
        className="signup-form-inputs"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label className="signup-input-title">Password</label>
      <input
        className="signup-form-inputs"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className="signup-input-title">Confirm Password</label>
      <input
        className="signup-form-inputs"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <div></div>
      <button className="signup-submit-button" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormPage;
