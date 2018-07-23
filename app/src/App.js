import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import FeedView from './FeedView.js';
import TransactionView from './TransactionView.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Route exact path="/" component={FeedView} />
          <Route path="/tx/:id" component={TransactionView} />
        </div>
      </Router>
    );
  }
}

export default App;
