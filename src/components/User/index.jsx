import React, { Component } from 'react';
import { User } from 'react-feather';
import Select from '../Select';
import { Quote } from '../Quote';
import { CURRENCIES, withData } from '../Library';
import Input from '../Input';
import Button from '../Button';
import Alert from '../Alert';
import './index.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tempName: 'Guest',
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ tempName: e.target.value });
  }

  onClickHandler() {
    this.setState((state) => ({
      name: state.tempName,
    }));
  }

  render() {
    return (
      <div>
        <h1 className='logo'>KashUp</h1>
        <User size='70' className='user' />
        <h2 className='user__name'>{this.state.name}</h2>
        <SelectWithCurrency onChangeHandler={this.props.onCurrencyChange} />
        <Quote />
        {this.state.name ? (
          ''
        ) : (
          <Alert title='Add User'>
            <Input
              type='text'
              onChangeHandler={(e) => this.onChangeHandler(e)}
              placeholder='Name'
            />
            <b>
              We are glad that you are here. You can set your expenditure limit
              below which will notify you when you reach this limit.
            </b>
            <Input
              type='number'
              onChangeHandler={(e) => this.props.onExpLimitChange(e)}
              placeholder='Expenditure Limit'
            />
            <Button text='Submit' onClickHandler={this.onClickHandler} />
            <Button text='Cancel' onClickHandler={this.onClickHandler} />
          </Alert>
        )}
      </div>
    );
  }
}

const SelectWithCurrency = withData(Select)(CURRENCIES);

export default Header;
