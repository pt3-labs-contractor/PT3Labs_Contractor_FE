import React from 'react';

import './Content.css';

export default function Content() {
  return (
    <div>
      <section className="built-on">
        <div className="container .dark-overlay">
          <div className="section-heading">
            <h1>
              <span className="tech">Technology</span> Stack
            </h1>
          </div>
          <div className="stacks">
            <div className="stack">
              <div className="icon-container">
                <i className="fas fa-code" />
              </div>
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
              <div className="icon-container">
                <i className="fas fa-layer-group" />
              </div>
              <h1>Back-End</h1>
              <ul className="dev-tools">
                <li>Node</li>
                <li>Express</li>
                <li>Postgres</li>
                <li>SQL</li>
                <li>GraphQL</li>
              </ul>
            </div>

            <div className="stack">
              <div className="icon-container">
                <i className="fas fa-laptop-code" />
              </div>
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
        </div>
      </section>
    </div>
  );
}
