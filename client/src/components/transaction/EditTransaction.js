import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { Component } from 'react';

class EditTransaction extends Component {
  constructor() {
    super();
    this.state = {
      amount: '',
      type: 'income',
      note: '',
      errors: {},
    };
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { amount, note, type } = this.state;
    this.props.updateTransaction(this.props.id, { amount, note, type });
    this.props.collapseMenuClose();
  };

  componentDidMount() {
    const { amount, note, type } = this.props;
    this.setState({
      ...this.state,
      amount,
      note,
      type,
    });
  }

  render() {
    const { amount, type, note, errors } = this.state;
    return (
      <form onSubmit={this.submitHandler} style={{ padding: 20 }}>
        <TextField
          type='number'
          label='Amount'
          placeholder='Enter amount'
          helperText={errors.amount ? errors.amount : ''}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.amount}
          name='amount'
          onChange={this.changeHandler}
          value={amount}
        />
        <FormControl style={{ width: '100%' }}>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={type}
            onChange={this.changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            name='type'
          >
            <MenuItem value='income'>Income</MenuItem>
            <MenuItem value='expense'>Expense</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type='text'
          label='Note'
          placeholder='Enter a note'
          helperText={errors.note ? errors.note : ''}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.note}
          name='note'
          onChange={this.changeHandler}
          value={note}
        />
        <Button variant='contained' color='primary' type='submit' size='small'>
          Update
        </Button>
      </form>
    );
  }
}

export default EditTransaction;
