import React, { Component } from "react";
import { Link } from "react-router-dom";

const SignUpForm = ({ state, textChange, userAction }) => {
  return (
    <div className="centered">
      {state.signUpError ? <p>{state.signUpError}</p> : null}
      <h1>Sign Up<span id="coloured">.</span></h1>
      <p>Hello! Enter your details to start tracking your favourite companies today.</p>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="text"
          placeholder="First Name"
          value={state.signUpFirstName}
          onChange={textChange.onTextboxChangeSignUpFirstName}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="text"
          placeholder="Last Name"
          value={state.signUpLastName}
          onChange={textChange.onTextboxChangeSignUpLastName}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="email"
          placeholder="Email"
          value={state.signUpEmail}
          onChange={textChange.onTextboxChangeSignUpEmail}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="password"
          placeholder="Password"
          value={state.signUpPassword}
          onChange={textChange.onTextboxChangeSignUpPassword}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <button className="m-btn-sign m-btn-theme" onClick={userAction.onSignUp}>
        ->Create Account
      </button>
      <p>
        Already have an account? Go to{" "}
        <span id="coloured"><Link to="/account/signin">
          sign in</Link></span>
        .
      </p>
    </div>
  );
};

export default SignUpForm;
