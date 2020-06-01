import React from "react";
import { Link } from "react-router-dom";

const SignInForm = ({ state, textChange, userAction }) => {
    
  return (
    <div className="section">
      {state.signInError ? <p>{state.signInError}</p> : null}
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={state.signInEmail}
        onChange={textChange.onTextboxChangeSignInEmail}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={state.signInPassword}
        onChange={textChange.onTextboxChangeSignInPassword}
      />
      <br />
      <button onClick={userAction.onSignIn}>Sign In</button>
      <p>Don't have an account? <Link to="/account/signup">Sign up</Link>.</p>
    </div>
  );
};

export default SignInForm;
