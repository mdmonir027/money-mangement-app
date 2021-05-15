import { Button, Card, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: '',
    };
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <Grid container justify='center' style={{ marginTop: 20 }}>
        <Grid item md={5}>
          <Card style={{ padding: 30 }}>
            <h3>Register Your Account</h3>
            <form onSubmit={this.submitHandler}>
              <TextField
                label='Name'
                placeholder='Full name'
                helperText=''
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={false}
                name='name'
                onChange={this.changeHandler}
                value={name}
              />
              <TextField
                type='email'
                label='Email'
                placeholder='Email address'
                helperText=''
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={false}
                name='email'
                onChange={this.changeHandler}
                value={email}
              />
              <TextField
                type='password'
                label='password'
                placeholder='Password'
                helperText=''
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={false}
                name='password'
                onChange={this.changeHandler}
                value={password}
              />
              <TextField
                type='password'
                label='Confirm Password'
                placeholder='Confirm password'
                helperText=''
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                error={false}
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

export default Register;
