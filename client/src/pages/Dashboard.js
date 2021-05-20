import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transaction from '../components/transaction/Transaction';
import { loadTransactions } from '../store/actions/transactionAction';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.loadTransactions();
  }

  render() {
    const { auth, transactions } = this.props;
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    return (
      <div>
        <h2>Dashboard</h2>
        {transactions.length > 0 ? (
          transactions?.map((tran) => (
            <Transaction
              key={tran._id}
              user={auth.user}
              note={tran.note}
              id={tran._id}
              amount={tran.amount}
              type={tran.type}
              createdAt={tran.createdAt}
            />
          ))
        ) : (
          <h3>No transaction found</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
});

export default connect(mapStateToProps, { loadTransactions })(Dashboard);
