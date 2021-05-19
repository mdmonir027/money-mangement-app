import { Container, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import AddNewTransaction from './pages/AddNewTransaction';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Container style={{ marginTop: 10 }}>
          <Grid container justify='center'>
            <Grid item md={5}>
              <Profile />
            </Grid>
            <Grid item md={5}>
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/add-new' component={AddNewTransaction} />
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </Router>
    );
  }
}
