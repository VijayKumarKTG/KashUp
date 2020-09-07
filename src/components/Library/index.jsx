import React from 'react';

export const CURRENCIES = [
  { text: 'Currency', value: '$', id: '1' },
  { text: 'USD - $', value: '$', id: '2' },
  { text: 'INR - ₹', value: '₹', id: '3' },
  { text: 'MMK - Ks', value: 'Ks', id: '4' },
];

export const QUOTES = [
  {
    text:
      'It’s simple arithmetic: Your income can grow only to the extent that you do.',
    author: 'T. Harv Eker',
  },
  {
    text:
      'Formal education will make you a living; self-education will make you a fortune.',
    author: 'Jim Rohn',
  },
  {
    text:
      'The only difference between a rich person and a poor person is how they use their time.',
    author: 'Robert Kiyosaki',
  },
  {
    text: 'The more you learn, the more you earn.',
    author: 'Frank Clark',
  },
  {
    text: 'Wealth is largely the result of habit.',
    author: 'John Jacob Astor',
  },
];

export const TYPES = [
  { value: 'income', text: 'Inc', id: '1' },
  { value: 'expense', text: 'Exp', id: '2' },
];

export const withData = (WrappedComponent) => {
  return (data) => {
    return class extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return <WrappedComponent data={data} {...this.props} />;
      }
    };
  };
};

export const extractInputCategory = (data) => {
  let obj = [];
  for (const [key, val] of Object.entries(data)) {
    obj.push({ value: key, text: key, id: val.id });
  }
  return obj;
};

export const getTotal = (data) => {
  let total = 0;
  for (const val of Object.values(data)) {
    total += val.amount[val.amount.length - 1];
  }
  return total;
};

export const getVisualizationData = (data) => {
  let obj = [];
  for (const [key, val] of Object.entries(data)) {
    obj.push({
      title: key,
      value: getAverageValue(val.amount),
      color: getRandomColor(),
    });
  }
  return obj;
};

const getAverageValue = (values) => {
  let total = values.reduce((tot, value) => tot + value);
  return Math.ceil(total / values.length);
};

const getRandomColor = () => {
  let red = getRandomNumber(256);
  let green = getRandomNumber(256);
  let blue = getRandomNumber(256);
  return `rgb(${red},${green},${blue})`;
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
