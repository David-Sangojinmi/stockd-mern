import React from 'react';

import { Link as NavLink } from 'react-router-dom';
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => (
  <header>
    <nav>
      <div>
        <NavLink className="navtitle" to="/">
          Stock'd
        </NavLink>

        <Link className="navlink" to="/#about">
          About
        </Link>

        <Link className="navlink" to="/#feedback">
          Feedback
        </Link>

        <NavLink className="navlink" to="/account/signin">
          Sign In
        </NavLink>
      </div>
    </nav>
  </header>
);

export default Navbar;
