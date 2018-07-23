import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header.js';

import FeedView from './FeedView.js';
import TransactionView from './TransactionView.js';

const Wrapper = styled.div`
  max-width: 60rem;
  margin: auto;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Wrapper>
            <Route exact path="/" component={FeedView} />
            <Route path="/tx/:id" component={TransactionView} />
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;
