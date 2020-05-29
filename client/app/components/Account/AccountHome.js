import React, { Component } from "react";
import "whatwg-fetch";
import SignInForm from "./SignInForm";
import Account from "./Account";
import Loading from "./Loading";
import db1 from "../../../public/assets/img/db1.jpg";
var bgStyle = {
  background: `url(${db1})`
};

import { getFromStorage, setInStorage } from "../../utils/storage";

class AccountHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: ""
    };

    this.textchange = {
      onTextboxChangeSignInEmail: this.onTextboxChangeSignInEmail.bind(this),
      onTextboxChangeSignInPassword: this.onTextboxChangeSignInPassword.bind(this)
    };

    this.useraction = {
      onSignIn: this.onSignIn.bind(this),
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
          <div className="dashboard-section bg-no-repeat bg-cover bg-fixed" style={bgStyle}>
            <SignInForm
              state={this.state}
              textChange={this.textchange}
              userAction={this.useraction}
            />
          </div>
        </>
      );
    }

    return (
      <Account />
    );
  }
}

export default AccountHome;
