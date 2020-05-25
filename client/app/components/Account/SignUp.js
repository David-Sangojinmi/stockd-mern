import React, { Component } from "react";

const SignUpForm = ({ state, textChange, userAction }) => {
  return (
    <div>
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
    </div>
  );
};

export default SignUpForm;
