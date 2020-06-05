import React from "react";
import { Link } from "react-router-dom";

const SignInForm = ({ state, textChange, userAction }) => {
  return (
    <div className="centered">
      {state.signInError ? <p>{state.signInError}</p> : null}
      <h1>Sign In<span id="coloured">.</span></h1>
      <p>Sign in to access your dashboard and get back to tracking.</p>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="email"
          placeholder="Email"
          value={state.signInEmail}
          onChange={textChange.onTextboxChangeSignInEmail}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <div className="form-group">
        <input
          className="form-control sign-group"
          type="password"
          placeholder="Password"
          value={state.signInPassword}
          onChange={textChange.onTextboxChangeSignInPassword}
        />
        <span className="sign-input-focus-effect"></span>
      </div>
      <button className="m-btn-sign m-btn-theme" onClick={userAction.onSignIn}>
        -> Continue
      </button>
      <p>
        Haven't created an account yet? Sign up{" "}
        <span id="coloured"><Link to="/account/signup">
          here</Link></span>
        .
      </p>
    </div>
  );
};

export default SignInForm;
