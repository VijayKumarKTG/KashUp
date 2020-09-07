import React from 'react';
import './index.css';

const Input = (props) => {
  const { type, placeholder, onChangeHandler } = props;
  return (
    <input type={type} placeholder={placeholder} onChange={onChangeHandler} />
  );
};

export default Input;
