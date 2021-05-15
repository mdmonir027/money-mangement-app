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
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
