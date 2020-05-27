import React, { Component } from "react";
import { Link } from "react-router-dom";

const SignUpForm = ({ state, textChange, userAction }) => {
  return (
    <div className="section">
      {state.signUpError ? <p>{state.signUpError}</p> : null}
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={state.signUpFirstName}
        onChange={textChange.onTextboxChangeSignUpFirstName}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        value={state.signUpLastName}
        onChange={textChange.onTextboxChangeSignUpLastName}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={state.signUpEmail}
        onChange={textChange.onTextboxChangeSignUpEmail}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={state.signUpPassword}
        onChange={textChange.onTextboxChangeSignUpPassword}
      />
      <br />
      <button onClick={userAction.onSignUp}>Sign Up</button>
      <p>
        Made an account? <Link to="/signin">Sign in</Link>.
      </p>
    </div>
  );
};

export default SignUpForm;
