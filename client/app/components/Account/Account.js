import React, { Component } from "react";
import { Link } from "react-router-dom";
import "whatwg-fetch";
import Loading from "./Loading";
import Stock from "./Stock";
// import StockAxios from "./StockAxios";
import db3 from "../../../public/assets/img/db3.jpg";
var bgStyle = {
  background: `url(${db3})`
};
var logoutStyle = {
  float: "right"
};

import { getFromStorage, setInStorage } from "../../utils/storage";

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
      <>
        <section className="dashboard-section bg-no-repeat bg-cover bg-fixed" style={bgStyle}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8 gray-bg-1">
                <h1>Welcome back!</h1>
              </div>
              <div className="col-md-12 col-lg-4 gray-bg-1">
                <Link to="/">
                  <button
                    className="m-btn m-btn-theme"
                    style={{ logoutStyle }}
                    onClick={this.useraction.logout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Stock />
        </section>
        {/* <StockAxios /> */}
      </>
    );
  }
}

export default Account;
