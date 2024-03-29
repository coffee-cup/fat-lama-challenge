import React, { Component } from 'react';
import StyledLink from './components/StyledLink.js';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import moment from 'moment';

import { updateTransactionStatus, getTransactionById } from './api.js';
import { colours } from './styles.js';
import Title from './components/Title.js';
import InfoCell from './components/InfoCell.js';

const statusOptions = [
  { value: 'ESCROW', label: 'ESCROW' },
  { value: 'PRE_AUTHORIZED', label: 'PRE_AUTHORIZED' },
  { value: 'PRE_AUTHORIZED_CANCELLED', label: 'PRE_AUTHORIZED_CANCELLED' },
  { value: 'FL_APPROVED', label: 'FL_APPROVED' },
  { value: 'PAID', label: 'PAID' },
  { value: 'CANCELLED', label: 'CANCELLED' }
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
        <InfoCell name="Start Date">
          {moment(tx.startDate).format('Do MMM YY')}
        </InfoCell>
        <InfoCell name="From Date">
          {moment(tx.fromDate).format('Do MMM YY')}
        </InfoCell>
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
