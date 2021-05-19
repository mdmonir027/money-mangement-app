import { Card, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Profile = ({ transactions, auth }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let incomeSum = 0;
    transactions.forEach((tran, index) => {
      if (tran.type === 'income') {
        incomeSum = incomeSum + tran.amount;
      }
    });

    setIncome(incomeSum);
  }, [transactions]);
  useEffect(() => {
    let expenseSum = 0;
    transactions.forEach((tran) => {
      if (tran.type === 'expense') {
        expenseSum = expenseSum + tran.amount;
      }
    });

    setExpense(expenseSum);
  }, [transactions]);

  useEffect(() => setBalance(income - expense), [income, expense]);

  const { name, email } = auth.user;

  return (
    <Card style={{ padding: 20, margin: 30 }}>
      <h3>Profile</h3>
      <h4 style={{ margin: 0, padding: '10px 0' }}> Name: {name}</h4>
      <Divider />
      <h4 style={{ margin: 0, padding: '10px 0' }}> Email: {email}</h4>
      <Divider />
      <h4 style={{ margin: 0, padding: '10px 0' }}> Balance: {balance}</h4>
      <Divider />
      <h4 style={{ margin: 0, padding: '10px 0' }}> Income: {income}</h4>
      <Divider />
      <h4 style={{ margin: 0, padding: '10px 0' }}> Expense: {expense}</h4>
      <Divider />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
});

export default connect(mapStateToProps)(Profile);
