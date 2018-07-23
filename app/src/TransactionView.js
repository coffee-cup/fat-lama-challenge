import React, { Component } from 'react';
import { getTransactions } from './api.js';

class TransactionView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return (
      <div className="transaction-view">
        <h1>Transaction View</h1>
      </div>
    );
  }
}

export default TransactionView;
