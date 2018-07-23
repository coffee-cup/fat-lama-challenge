import React, { Component } from 'react';
import styled from 'styled-components';
import { getTransactionById } from './api.js';
import Title from './components/Title.js';

const Row = styled.div`
  padding: 0.8rem 0;

  > span:first-child {
    display: inline-block;
    padding-right: 1rem;
    min-width: 7rem;
    font-weight: bold;
  }
`;

const InfoCell = ({ name, value }) => (
  <Row>
    <span>{name}</span>
    <span>{value}</span>
  </Row>
);

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
    const tx = this.state.transaction;
    return (
      <div className="transaction-view">
        <Title>Transaction View</Title>

        <div className="transaction-info">
          <InfoCell name="Id" value={tx.id} />
          <InfoCell name="Item" value={tx.itemId} />
          <InfoCell name="Status" value={tx.status} />
          <InfoCell name="Price" value={tx.price} />
          <InfoCell name="Currency" value={tx.currency} />
          <InfoCell name="Discount" value={tx.totalDiscount} />
          <InfoCell name="Borrower" value={tx.borrowerId} />
          <InfoCell name="Lender" value={tx.lenderId} />
        </div>
      </div>
    );
  }
}

export default TransactionView;
