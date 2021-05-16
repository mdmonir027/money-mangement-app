import { Button, Card, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../store/actions/authActions';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    const { name, email, password, confirmPassword } = this.state;
    this.props.register(
      { name, email, password, confirmPassword },
      this.props.history
    );
  };

  render() {
    const { name, email, password, confirmPassword, errors } = this.state;
    return (
      <Grid container justify='center' style={{ marginTop: 20 }}>
        <Grid item md={5}>
          <Card style={{ padding: 30 }}>
            <h3>Register Your Account</h3>
            <form onSubmit={this.submitHandler}>
              <TextField
                label='Name'
                placeholder='Full name'
                helperText={errors.name ? errors.name : ''}
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.name}
                name='name'
                onChange={this.changeHandler}
                value={name}
              />
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
              <TextField
                type='password'
                label='Confirm Password'
                placeholder='Confirm password'
                helperText={
                  errors.confirmPassword ? errors.confirmPassword : ''
                }
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.confirmPassword}
                name='confirmPassword'
                onChange={this.changeHandler}
                value={confirmPassword}
              />
              <Button variant='contained' color='primary' type='submit'>
                Register
              </Button>
            </form>
            <Link
              to='/login'
              style={{
                marginTop: 10,
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              Log In your account
            </Link>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapToStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapToStateProps, { register })(Register);
