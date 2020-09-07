import React, { Component } from 'react';
import Alert from '../Alert';
import Button from '../Button';
import { CurrencyContext } from '../contexts';
import './index.css';

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
      <div className='limit__container'>
        <CurrencyContext.Consumer>
          {(currency) => (
            <div className='limit__flex'>
              <div className='limit__income'>
                Total Income: {`${currency} ${incomeTotal}`}
              </div>
              <div className='limit__expense'>
                Total Expense: {`${currency} ${expenseTotal}`}
              </div>
              <div className='limit__amount'>
                Expenditure Limit: {`${currency} ${limit}`}
              </div>
            </div>
          )}
        </CurrencyContext.Consumer>
        {parseInt(expenseTotal) >= parseInt(limit) && (
          <p className='limit__text'>
            You have arrived to the expenditure limit you set.
          </p>
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
