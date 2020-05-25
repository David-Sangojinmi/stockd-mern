import React from "react";

const SignInForm = ({ state, textChange, userAction }) => {
    
  return (
    <form>
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
    </form>
  );
};

export default SignInForm;
