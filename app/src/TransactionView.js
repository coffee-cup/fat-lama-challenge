import React, { Component } from 'react';
import StyledLink from './components/StyledLink.js';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import styled from 'styled-components';
import Title from './components/Title.js';
import { colours } from './styles.js';
import { updateTransactionStatus, getTransactionById } from './api.js';

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;

  > div {
    min-width: 14rem;
  }

  > span:first-child {
    display: inline-block;
    min-width: 8rem;
    padding-right: 1rem;
    font-weight: bold;
  }
`;

const InfoCell = ({ name, children }) => (
  <Row>
    <span>{name}</span>
    {children}
  </Row>
);

const statusOptions = [
  { value: 'ESCROW', label: 'ESCROW' },
  { value: 'PRE_AUTHORIZED', label: 'PRE_AUTHORIZED' },
  { value: 'FL_APPROVED', label: 'FL_APPROVED' }
];

class TransactionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionId: props.match.params.id,
      loading: true
    };
  }

  updateTransaction() {
    getTransactionById(this.state.transactionId)
      .then(transaction => {
        this.setState({
          transaction,
          loading: false
        });
      })
      .catch(() => this.setState({ loading: false }));
  }

  componentWillMount() {
    this.updateTransaction();
  }

  selectStatusOption({ value }, { action }) {
    if (action === 'select-option') {
      const { transactionId } = this.state;
      updateTransactionStatus(transactionId, value).then(tx => {
        this.setState({ transaction: tx });
      });
    }
  }

  renderTransaction() {
    const tx = this.state.transaction;

    return (
      <div className="transaction-info">
        <InfoCell name="Id">{tx.id}</InfoCell>
        <InfoCell name="Item">{tx.itemId} </InfoCell>
        <InfoCell name="Status">
          <Select
            options={statusOptions}
            autosize={false}
            value={{ value: tx.status, label: tx.status }}
            style={{
              width: '20rem'
            }}
            onChange={this.selectStatusOption.bind(this)}
          />
        </InfoCell>

        <InfoCell name="Price">{tx.price}</InfoCell>
        <InfoCell name="Currency">{tx.currency}</InfoCell>
        <InfoCell name="Discount">{tx.totalDiscount} </InfoCell>
        <InfoCell name="Borrower">
          <StyledLink to={`/user/${tx.borrowerId}`}>{tx.borrowerId}</StyledLink>
        </InfoCell>
        <InfoCell name="Lender">
          <StyledLink to={`/user/${tx.lenderId}`}>{tx.lenderId}</StyledLink>
        </InfoCell>
      </div>
    );
  }

  renderLoading() {
    return <ReactLoading type="bubbles" color={colours.primary} />;
  }

  render() {
    const tx = this.state.transaction;
    const { loading } = this.state;

    return (
      <div className="transaction-view">
        <Title>Transaction View</Title>

        {loading ? (
          this.renderLoading()
        ) : tx ? (
          this.renderTransaction()
        ) : (
          <p>Transaction {this.state.transactionId} is not found</p>
        )}
      </div>
    );
  }
}

export default TransactionView;
