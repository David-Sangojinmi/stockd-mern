import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-logo">
        <span>David Sangojinmi.</span>
      </div>
      <ul className="social-icons">
        <li>
          <a href="https://github.com/David-Sangojinmi">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a href="https://medium.com/@davidsangojinmi">
            <i className="fab fa-medium-m"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/david-sangojinmi">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
      <h6 className="h7">
        © 2020 <span>David Sangojinmi.</span> All rights reserved
      </h6>
    </div>
  </footer>
);

export default Footer;
