import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

import { getTransactions } from './api.js';
import Title from './components/Title.js';

const dateCell = cell => moment(cell.value).format('Do MMM YY');

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
    accessor: 'fromDate',
    Cell: dateCell
  },
  {
    Header: 'To Date',
    accessor: 'toDate',
    Cell: dateCell
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
      maxPage: 0,
      transactions: []
    };
  }

  componentWillMount() {
    this.nextPage();
  }

  // Fetch and load next page of results
  nextPage() {
    const { lastPage, transactions, maxPage } = this.state;
    // prevent unnecessary requests by only fetching next page
    // if user can see the end of the current fetched transactions
    if (lastPage > maxPage) {
      return;
    }

    getTransactions(lastPage + 1)
      .then(newPage => {
        if (newPage) {
          this.setState({
            transactions: transactions.concat(newPage),
            lastPage: lastPage + 1
          });
          this.nextPage();
        }
      })
      .catch(console.error);
  }

  pageSizeChange(page) {
    const { maxPage } = this.state;
    this.setState({ maxPage: Math.max(maxPage, page) }, () => this.nextPage());
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
          showPageSizeOptions={false}
          defaultPageSize={20}
          onPageChange={this.pageSizeChange.bind(this)}
        />
      </div>
    );
  }
}

export default FeedView;
