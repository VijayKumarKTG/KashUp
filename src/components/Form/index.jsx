import React, { Component } from 'react';
import Select from '../Select';
import Input from '../Input';
import { TYPES, withData } from '../Library';
import { ArrowRight } from 'react-feather';
import Button from '../Button';
import './index.css';

let tempComp = withData(Select),
  categoryFlag = true,
  tempData;
let SelectWithCategory;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'income',
      category: '',
      amount: 0,
    };

    this.onTypeChangeHandler = this.onTypeChangeHandler.bind(this);
    this.onCategoryChangeHandler = this.onCategoryChangeHandler.bind(this);
    this.onAmountChangeHandler = this.onAmountChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ category: this.props.income[0].text });
  }

  onTypeChangeHandler(e) {
    this.setState({
      type: e.target.value,
      category: this.props[e.target.value][0].text,
    });
    categoryFlag = true;
  }

  onCategoryChangeHandler(e) {
    this.setState({ category: e.target.value });
  }

  onAmountChangeHandler(e) {
    this.setState({ amount: parseInt(e.target.value) });
  }

  render() {
    const { type, category, amount } = { ...this.state };
    if (
      tempData !== undefined &&
      tempData.length !== this.props[this.state.type].length
    ) {
      tempData = this.props[this.state.type];
      SelectWithCategory = tempComp(tempData);
    }
    if (categoryFlag) {
      tempData = this.props[this.state.type];
      SelectWithCategory = tempComp(this.props[this.state.type]);
      changeFlagState();
    }
    return (
      <div>
        <SelectWithType onChangeHandler={this.onTypeChangeHandler} />
        <SelectWithCategory onChangeHandler={this.onCategoryChangeHandler} />
        <Input
          type='number'
          onChangeHandler={(e) => this.onAmountChangeHandler(e)}
          placeholder='Amount'
        />
        <Button
          className='submit'
          text={<ArrowRight size={20} />}
          onClickHandler={() => this.props.onSubmit(type, category, amount)}
        />
      </div>
    );
  }
}

const SelectWithType = withData(Select)(TYPES);
const changeFlagState = () => {
  categoryFlag = false;
};

export default Form;
