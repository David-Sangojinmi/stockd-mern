import React from "react";
import bg1 from "../../../public/assets/img/bg1.jpg";
// import bg2 from "../../../public/assets/img/bg2.jpg";
// import bg3 from "../../../public/assets/img/bg3.jpg";
// import bg4 from "../../../public/assets/img/bg4.jpg";
// import db1 from "../../../public/assets/img/db1.jpg";
// import db2 from "../../../public/assets/img/db2.jpg";
// import db3 from "../../../public/assets/img/db3.jpg";
var homeStyle = {
  backgroundImage: 'url(' + bg1 + ')'
}

const Home = () => (
  <>
    <section id="home" className="home-banner-01 bg-no-repeat bg-cover bg-fixed home-bg tint-bg-1" style={homeStyle}>
      <div className="container">
        <div className="row full-screen align-items-center">
          <div className="col-md-12 col-lg-9 text-left">
            <div className="home-text">
              <h1>Stock<span id="coloured">'</span>d</h1>
              <h2>Easily track the metrics of your favourite companies</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
