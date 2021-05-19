import Container from '@material-ui/core/Container';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import AddNewTransaction from './pages/AddNewTransaction';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/add-new' component={AddNewTransaction} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
