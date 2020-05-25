import React from "react";
// import background from "../../../public/assets/img/background.jpg";
// import bg2 from "../../../public/assets/img/background2.jpg";
import loader from "sass-loader";
// import { urlencoded } from 'express';

const Main = () => (
  <>
    <section
      id="home"
      className="home-banner-01 bg-no-repeat bg-cover bg-fixed home-bg"
    >
      <div className="container">
        <div className="row full-screen align-items-center">
          <div className="col-12 col-md-12 text-center">
            <div className="home-text">
              <h1 className="font-alt">
                Stock<span id="coloured">'</span>d
              </h1>
              <h2 className="font-alt">Easily track the metrics of your favourite companies</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" className="section gray-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-5">
            <div className="about-box">
              <div className="about-me">
                <h6>Welcome</h6>
                <h2>
                  About <span id="coloured">The Project</span>
                </h2>
                <p>
                  "Currently I am a full-time student based in London. Since an early age, I have
                  been a creative and found it fascinating how we are able to create complexity from
                  basic components. Ranging from origami, to woodworks, and websites, I enjoy the
                  process of going from concept to realisation and this developed into a passion for
                  technology. Technology allows us to explore some of the worlds most important
                  problems, and provide effective solutions. Recently, my interest has piqued in
                  machine learning due to the wide impact it is having in so many fields and
                  everyday life."
                </p>
                <p>
                  " Machine learning is a fast paced and innovative field with research being
                  completed almost constantly. I am trying to broaden and deepen my knowledge by
                  utilising any available resources. Some of which include: Coursera Machine
                  Learning, YouTube courses, the School of AI and a host of books and research
                  papers. My objective is to become sufficiently adept with machine learning
                  technologies and use this knowledge to solve problems and help people be more
                  efficient."
                </p>
              </div>
              <div className="tech-stack">
                <h6>Welcome</h6>
                <h2>
                  The <span id="coloured">Tech Stack</span>
                </h2>
                <p>
                  Stock'd is built using the <span id="coloured">MERN</span> stack. I decided to
                  adopt MERN for two main reasons: every line of code can be written in Javascript
                  and MERN is suited to developing smaller scale applications, like this.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="feature-box">
                      <i id="stack-text"></i>
                      <div className="feature-content">
                        <h5>MongoDB</h5>
                        <p>
                          A cross-platform NoSQL document orientated database. Flexible and easy to
                          scale.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-box">
                      <i id="stack-text"></i>
                      <div className="feature-content">
                        <h5>Express.js</h5>
                        <p>A back-end application framework. Fase and minimalist.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-box">
                      <i id="stack-text"></i>
                      <div className="feature-content">
                        <h5>React</h5>
                        <p>
                          A Javascript library for building user interfaces. The defining feature of
                          this stack.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-box">
                      <i id="stack-text"></i>
                      <div className="feature-content">
                        <h5>Node.js</h5>
                        <p>
                          A cross-platform Javascript run-time environment. Builds scalable network
                          applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="feedback" className="section">
      Gimme feedback uh
    </section>
  </>
);

export default Main;
