import React, { Component } from "react";
import "whatwg-fetch";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Account from "./Account";
import db1 from "../../../public/assets/img/db1.jpg";
var bgStyle = {
  backgroundImage: `url(${db1})`
};

import { getFromStorage, setInStorage } from "../../utils/storage";

class AccountHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: ""
    };

    // this.textchange = {
    //   onTextboxChangeSignInEmail: this.onTextboxChangeSignInEmail.bind(this),
    //   onTextboxChangeSignInPassword: this.onTextboxChangeSignInPassword.bind(this)
    // };

    this.useraction = {
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
    const { isLoading, token } = this.state;

    if (isLoading) {
      return (
        <>
          <Loading />
        </>
      );
    }

    if (!token) {
      return (
        <section
          className="home-banner-01 bg-no-repeat bg-cover bg-fixed tint-bg-1"
          style={bgStyle}
        >
          <div className="container">
            <div className="row full-screen align-items-center">
              <div className="centered">
                <h2 style={{color:'#FFFFFF'}}>You're not signed in :(</h2>
                <p>
                  {" "}
                  Click{" "}
                  <span id="coloured">
                    <Link to="/account/signin">here</Link>
                  </span>{" "}
                  to sign in or{" "}
                  <span id="coloured">
                    <Link to="/account/signup">here</Link>
                  </span>{" "}
                  to sign up!
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return <Account />;
  }
}

export default AccountHome;
