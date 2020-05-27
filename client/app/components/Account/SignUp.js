import React, { Component } from "react";
import "whatwg-fetch";
import SignUpForm from "./SignUpForm";
import Loading from "./Loading";

import { getFromStorage, setInStorage } from "../../utils/storage";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
    };

    this.textchange = {
      onTextboxChangeSignUpEmail: this.onTextboxChangeSignUpEmail.bind(this),
      onTextboxChangeSignUpPassword: this.onTextboxChangeSignUpPassword.bind(this),
      onTextboxChangeSignUpFirstName: this.onTextboxChangeSignUpFirstName.bind(this),
      onTextboxChangeSignUpLastName: this.onTextboxChangeSignUpLastName.bind(this)
    };

    this.useraction = {
      onSignUp: this.onSignUp.bind(this)
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;

      // Verify the token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onSignUp() {
    // Grab state
    const { signUpFirstName, signUpLastName, signUpEmail, signUpPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            // Redirect them to login page rather than \/
            signUpFirstName: "",
            signUpLastName: "",
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

  render() {
    const {
      isLoading,
      token,
    } = this.state;

    if (isLoading) {
      return (
        <>
          <Loading/>
        </>
      );
    }

    if (!token) {
      return (
        <>
          <div>
            <SignUpForm
              state={this.state}
              textChange={this.textchange}
              userAction={this.useraction}
            />
          </div>
        </>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.useraction.logout}>Logout</button>
      </div>
    );
  }
}

export default SignUp;
