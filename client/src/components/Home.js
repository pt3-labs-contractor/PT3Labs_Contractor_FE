import React from 'react'
import { Jumbotron, Row, Col,Button } from 'reactstrap'

import './Home.css'

export default function Home() {
  return (
    <div>
      <Jumbotron> 
        <h2>Welcome to Lambda PT3 <span className="team-name">Team Gents</span></h2>
        <p>We making booking an appointment with a contractor easy and stress free.</p>
        <Button color="primary">Sign In</Button>
      </Jumbotron> 
      <Row>
        <Col xs={12} sm={4} className="person-wrapper">
          <h3>Painter</h3>
          <p>Book a painter now!</p>
          <img src="images/me3.png" alt="my pic" className="profile-pic" />
        </Col>
        <Col xs={12} sm={4} className="person-wrapper">
          <h3>Plumber</h3>
          <p>Book a Plumber now!</p>
          <img src="images/me3.png" alt="my pic" className="profile-pic" />
        </Col>
        <Col xs={12} sm={4} className="person-wrapper">
          <h3>Handyman</h3>
          <p>Book a Handyman now!</p>
          <img src="images/me3.png" alt="my pic" className="profile-pic" />
        </Col>
      </Row>
    </div>
  )
}
