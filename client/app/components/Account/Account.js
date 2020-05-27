import React, { Component } from "react";
import "whatwg-fetch";
import Loading from "./Loading";

import { getFromStorage, setInStorage } from "../../utils/storage";
import { urlencoded } from "express";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    // this.textchange = {
    //   onTextboxChangeSignInEmail: this.onTextboxChangeSignInEmail.bind(this),
    //   onTextboxChangeSignInPassword: this.onTextboxChangeSignInPassword.bind(this)
    // };

    this.useraction = {
      // onSignIn: this.onSignIn.bind(this),
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

  logout() {
    this.setState({
      isLoading: true
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
              token: "",
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

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <>
          <Loading />
        </>
      );
    }

    return (
      <section className="section gray-bg-2">
        <div className="col-md-12">
          <p>Account</p>
          <button className="m-btn m-btn-theme" onClick={this.useraction.logout}>
            Logout
          </button>
        </div>
      </section>
    );
  }
}

export default Account;
