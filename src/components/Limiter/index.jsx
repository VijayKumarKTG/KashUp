import React, { Component } from 'react';
import Alert from '../Alert';
import Button from '../Button';

export default class Limiter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };

    this.onLimitExceeds = this.onLimitExceeds.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onLimitExceeds() {
    this.setState({ active: true });
  }

  onCancel() {
    this.setState({ active: false });
  }

  render() {
    const { incomeTotal, expenseTotal, limit } = this.props;
    return (
      <div>
        <div>Total Income: {incomeTotal}</div>
        <div>Total Expense: {expenseTotal}</div>
        <div>Expenditure Limit: {limit}</div>
        {parseInt(expenseTotal) >= parseInt(limit) && (
          <p>You have arrived to the expenditure limit you set.</p>
        )}
        {this.state.active && parseInt(expenseTotal) >= parseInt(limit) && (
          <Alert title='Expenditure Limit Exceed'>
            <p>You have arrived to the expenditure limit you set.</p>
            <Button text='Cancel' onClickHandler={this.onCancel} />
          </Alert>
        )}
      </div>
    );
  }
}
