import React from 'react';
import './index.css';

const Alert = (props) => {
  return (
    <div className='alert'>
      <h2 className='alert__title'>{props.title}</h2>
      {props.children}
    </div>
  );
};
export default Alert;
