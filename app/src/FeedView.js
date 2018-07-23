import React, { Component } from 'react';
import { getTransactions } from './api.js';

const tableCell = ({
  id,
  fromDate,
  startDate,
  status,
  price,
  totalDiscount,
  currency
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{status}</td>
      <td>{startDate}</td>
      <td>{fromDate}</td>
      <td>{price}</td>
      <td>{totalDiscount}</td>
      <td>{currency}</td>
    </tr>
  );
};

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
      <div className="feed-view">
        <h1>Feed View</h1>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>From Date</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>{transactions.map(t => tableCell(t))}</tbody>
        </table>
      </div>
    );
  }
}

export default FeedView;
