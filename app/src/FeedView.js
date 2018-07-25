import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getTransactions } from './api.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Title from './components/Title.js';

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

const columns = [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: cell => <Link to={`/tx/${cell.value}`}>{cell.value}</Link>
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'From Date',
    accessor: 'fromDate'
  },
  {
    Header: 'To Date',
    accessor: 'toDate'
  },
  {
    Header: 'Item',
    accessor: 'itemId'
  },
  {
    Header: 'Price',
    accessor: 'price'
  },
  {
    Header: 'Discount',
    accessor: 'totalDiscount'
  },
  {
    Header: 'Currency',
    accessor: 'currency'
  }
];

class FeedView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPage: -1,
      transactions: []
    };
  }

  nextPage() {
    const { lastPage } = this.state;
    getTransactions(lastPage + 1).then(transactions => {
      this.setState({
        transactions,
        lastPage: lastPage + 1
      });
    });
  }

  componentWillMount() {
    this.nextPage();
  }

  render() {
    const { transactions } = this.state;

    return (
      <div className="feed-view">
        <Title>Transactions</Title>

        <ReactTable
          data={transactions}
          columns={columns}
          defaultSorted={[
            {
              id: 'id',
              desc: true
            }
          ]}
        />
      </div>
    );
  }
}

export default FeedView;
