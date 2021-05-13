import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default class App extends Component {
  render() {
    return (
      <div>
        <h3> Hello world</h3>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </Router>
      </div>
    );
  }
}
