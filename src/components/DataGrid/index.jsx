import React, { Component } from 'react';
import { PlusCircle } from 'react-feather';
import Input from '../Input';
import Button from '../Button';
import Alert from '../Alert';
import { DataFlex } from './DataFlex';
import { CurrencyContext } from '../contexts';
import './index.css';

export default class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      active: false,
      filter: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ category: e.target.value });
  }

  onCancel() {
    this.setState({ category: '', active: false });
  }

  onClickHandler() {
    this.setState({ active: true });
  }

  onFilter(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    let obj = [],
      regex;
    for (const [key, val] of Object.entries(this.props.data)) {
      regex = new RegExp(`${this.state.filter}`, 'gi');
      if (this.state.filter) {
        if (key.search(regex) > -1) {
          obj.push(
            <DataFlex
              key={val.id}
              category={key}
              amount={val.amount[val.amount.length - 1]}
              total={this.props.total}
              onClickHandler={this.props.onDelete}
            />
          );
        }
      } else {
        obj.push(
          <DataFlex
            type={this.props.type}
            key={val.id}
            category={key}
            amount={val.amount[val.amount.length - 1]}
            total={this.props.total}
            onClickHandler={this.props.onDelete}
          />
        );
      }
    }
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div>Filter by category name:</div>
          <Input
            type='text'
            placeholder='Category'
            onChangeHandler={(e) => this.onFilter(e)}
          />
        </div>
        <div className='grid__container'>
          <div className='grid__heading'>{this.props.type}</div>
          {obj.map((e) => e)}
          <div style={{ display: 'flex' }}>
            <div>Total</div>
            <CurrencyContext.Consumer>
              {(currency) => <div>{currency + ' ' + this.props.total}</div>}
            </CurrencyContext.Consumer>
          </div>
          <div onClick={this.onClickHandler}>
            <PlusCircle />
          </div>
        </div>
        {this.state.active && (
          <Alert title='Add a new Category'>
            <Input
              type='text'
              placeholder='New Category'
              onChangeHandler={(e) => this.onChangeHandler(e)}
            />
            <Button
              text='Submit'
              onClickHandler={() =>
                this.props.onSubmit(this.props.type, this.state.category)
              }
            />
            <Button text='Cancel' onClickHandler={this.onCancel} />
          </Alert>
        )}
      </div>
    );
  }
}
