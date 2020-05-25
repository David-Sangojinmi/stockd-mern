import React, { Component } from "react";
import "whatwg-fetch";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Loading from "./Loading";

import { getFromStorage, setInStorage } from "../../utils/storage";

class AccountHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: ""
    };

    this.textchange = {
      onTextboxChangeSignInEmail: this.onTextboxChangeSignInEmail.bind(this),
      onTextboxChangeSignInPassword: this.onTextboxChangeSignInPassword.bind(this),
      onTextboxChangeSignUpEmail: this.onTextboxChangeSignUpEmail.bind(this),
      onTextboxChangeSignUpPassword: this.onTextboxChangeSignUpPassword.bind(this),
      onTextboxChangeSignUpFirstName: this.onTextboxChangeSignUpFirstName.bind(this),
      onTextboxChangeSignUpLastName: this.onTextboxChangeSignUpLastName.bind(this)
    };

    this.useraction = {
      onSignIn: this.onSignIn.bind(this),
      onSignUp: this.onSignUp.bind(this),
      logout: this.logout.bind(this)
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

  onSignIn() {
    // Grab state
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the_main_app", {token: json.token });
          this.setState({
            signInError: json.message,
            token: json.token,
            isLoading: false,
            // Redirect them to dashboard page rather than \/
            signInEmail: "",
            signInPassword: ""
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }
  
  logout() {
    this.setState({
      isLoading: true,
    });

    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;

      // Verify the token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
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
            <SignInForm
              state={this.state}
              textChange={this.textchange}
              userAction={this.useraction}
            />
            <br />
            <br />
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

export default AccountHome;
