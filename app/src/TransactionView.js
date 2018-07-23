import React, { Component } from 'react';
import { getTransactionById } from './api.js';

class TransactionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionId: props.match.params.id,
      transaction: {}
    };
  }

  componentWillMount() {
    getTransactionById(this.state.transactionId).then(transaction => {
      console.log(transaction);
      this.setState({ transaction });
    });
  }

  render() {
    const { transactionId } = this.state;
    return (
      <div className="transaction-view">
        <h1>Transaction View {}</h1>
      </div>
    );
  }
}

export default TransactionView;
