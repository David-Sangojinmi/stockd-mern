import React from "react";

import { Link as NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => (
  <header>
    <nav className="navbar header-nav-01 fixed-header navbar-expand-lg">
      <div className="container">
        <NavLink className="navtitle" to="/">
          Stock'd
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarKeira"
          aria-controls="navbarKeira"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link className="navlink" to="/#about">
                About
              </Link>
            </li>
            <li>
              <Link className="navlink" to="/#feedback">
                Feedback
              </Link>
            </li>
            <li>
              <NavLink className="navlink" to="/account/home">
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
