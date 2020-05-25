import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <header>
    <nav>
      <div>
        <Link className="navtitle" to="/">
          Stock'd
        </Link>

        <Link className="navlink" to="#about">
          About
        </Link>

        <Link className="navlink" to="#feedback">
          Feedback
        </Link>

        <Link className="navlink" to="/account">
          Sign In
        </Link>
      </div>
    </nav>
  </header>
);

export default Navbar;
