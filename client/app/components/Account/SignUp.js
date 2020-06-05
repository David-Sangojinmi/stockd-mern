import React, { Component } from "react";
import "whatwg-fetch";
import SignUpForm from "./SignUpForm";
import Loading from "./Loading";
import db1 from "../../../public/assets/img/db1.jpg";
var bgStyle = {
  backgroundImage: `url(${db1})`
};

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
      signUpPassword: ""
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
          this.props.history.push("/account/signin");
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
    const { isLoading, token } = this.state;

    if (isLoading) {
      return (
        <>
          <Loading />
        </>
      );
    }

    return (
      <section
        className="sign-banner bg-no-repeat bg-cover bg-fixed home-bg tint-bg-1"
        style={bgStyle}
      >
        <div className="container">
          <div className="row full-screen">
            <SignUpForm
              state={this.state}
              textChange={this.textchange}
              userAction={this.useraction}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
