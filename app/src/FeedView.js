import React, { Component } from 'react';
import { getTransactions } from './api.js';

class FeedView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    };
  }

  componentWillMount() {
    getTransactions().then(transactions => {
      console.log(transactions);
      this.setState({ transactions });
    });
  }

  render() {
    const { transactions } = this.state;
    return (
      <div className="FeedView">
        <h1>Feed View</h1>

        <ul className="transaction-list">
          {transactions.map(t => <li key={t.id}>{t.id}</li>)}
        </ul>
      </div>
    );
  }
}

export default FeedView;
