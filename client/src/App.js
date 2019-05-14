import React from 'react';
import { Route } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar';
import Home from './components/Home';
import About from './components/About';

import './App.css';

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
