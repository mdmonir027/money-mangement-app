import Container from '@material-ui/core/Container';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
