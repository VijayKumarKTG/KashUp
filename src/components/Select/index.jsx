import React from 'react';
import './index.css';

const Select = (props) => {
  const { onChangeHandler } = props;
  return (
    <select onChange={(e) => onChangeHandler(e)}>
      {props.data.map((element) => (
        <option key={element.id} value={element.value}>
          {element.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
