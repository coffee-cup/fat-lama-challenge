import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTransactions } from './api.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Title from './components/Title.js';

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
      maxPage: 0,
      transactions: []
    };
  }

  componentWillMount() {
    this.nextPage();
  }

  nextPage() {
    const { lastPage, transactions, maxPage } = this.state;
    console.log(`lastPage: ${lastPage} maxPage: ${maxPage}`);
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
    console.log(page);
    this.setState(
      {
        maxPage: Math.max(maxPage, page)
      },
      () => this.nextPage()
    );
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
