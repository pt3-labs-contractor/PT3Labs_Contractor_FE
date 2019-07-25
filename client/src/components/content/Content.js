import React from 'react';

import './Content.css';

export default function Content() {
  return (
    <div>
      <section className="built-on">
        <div className="container .dark-overlay">
          <div className="section-heading">
            <h1 className="heading">
              <span className="tech">Technology</span>
              <span className="dark-tech"> Stack</span>
            </h1>
          </div>
          <div className="stacks">
            <div className="stack">
              <a href="https://github.com/pt3-labs-contractor/PT3Labs_Contractor_FE">
                <div className="icon-container">
                  <i className="fas fa-code" />
                </div>
              </a>
              <h1>Front-End</h1>
              <ul className="dev-tools">
                <li>React</li>
                <li>React-hooks</li>
                <li>Redux</li>
                <li>HTML5</li>
                <li>CSS</li>
              </ul>
            </div>

            <div className="stack">
              <a href="https://github.com/pt3-labs-contractor/PT3Labs_Contractor_BE">
                <div className="icon-container">
                  <i className="fas fa-layer-group" />
                </div>
              </a>
              <h1>Back-End</h1>
              <ul className="dev-tools">
                <li>Node</li>
                <li>Express</li>
                <li>Postgres</li>
                <li>SQL</li>
              </ul>
            </div>

            <div className="stack">
              <a href="https://github.com/pt3-labs-contractor">
                <div className="icon-container">
                  <i className="fas fa-laptop-code" />
                </div>
              </a>
              <h1>Technology</h1>
              <ul className="dev-tools">
                <li>Netlify</li>
                <li>Heroku</li>
                <li>Git</li>
                <li>Github</li>
                <li>Stripe</li>
                <li>O-auth</li>
                <li>Twilio</li>
              </ul>
            </div>
          </div>
          <div className="arrow-content">
            <i className="far fa-arrow-alt-circle-down arrow-motion" />
          </div>
        </div>
      </section>
    </div>
  );
}
