import { Button, Card, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../store/actions/authActions';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)
    ) {
      return {
        errors: nextProps.auth.errors,
      };
    }
    return {};
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <Grid container justify='center' style={{ marginTop: 20 }}>
        <Grid item md={5}>
          <Card style={{ padding: 30 }}>
            <h3>Register Your Account</h3>
            <form onSubmit={this.submitHandler}>
              <TextField
                type='email'
                label='Email'
                placeholder='Email address'
                helperText={errors.email ? errors.email : ''}
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.email}
                name='email'
                onChange={this.changeHandler}
                value={email}
              />
              <TextField
                type='password'
                label='Password'
                placeholder='Password'
                helperText={errors.password ? errors.password : ''}
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.password}
                name='password'
                onChange={this.changeHandler}
                value={password}
              />

              <Button variant='contained' color='primary' type='submit'>
                Login
              </Button>
            </form>
            <Link
              to='/register'
              style={{
                marginTop: 10,
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              Create a new account
            </Link>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
