import React from 'react';
import './index.css';

const Button = (props) => {
  const { text, onClickHandler } = props;
  return <button onClick={onClickHandler}>{text}</button>;
};
export default Button;
