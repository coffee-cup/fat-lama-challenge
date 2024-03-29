import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header.js';
import { colours } from './styles.js';

import FeedView from './FeedView.js';
import TransactionView from './TransactionView.js';
import UserView from './UserView.js';

const Wrapper = styled.div`
  max-width: 80rem;
  margin: auto;
  padding: 0 1rem 2rem 1rem;
  color: ${colours.dark};
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Wrapper>
            <Header />

            <Route exact path="/" component={FeedView} />
            <Route path="/tx/:id" component={TransactionView} />
            <Route path="/user/:id" component={UserView} />
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;
