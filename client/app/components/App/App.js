import React, { Component } from 'react';

import NavBar from "../Header/NavBar";
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <>
    <NavBar />

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
