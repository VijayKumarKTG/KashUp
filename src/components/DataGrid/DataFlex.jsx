import React from 'react';
import { Trash2 } from 'react-feather';
import { CurrencyContext } from '../contexts';
import './flex.css';

export const DataFlex = (props) => {
  const { type, category, amount, total, onClickHandler } = props;
  return (
    <div className='flex__container'>
      <div
        onClick={() => onClickHandler(type, category)}
        className='flex__delete'>
        <Trash2 />
      </div>
      <div
        className={
          type.toLowerCase() === 'expense'
            ? 'flex__text flex__text--expense'
            : 'flex__text'
        }>
        {category}
      </div>
      <CurrencyContext.Consumer>
        {(currency) => (
          <div
            className={
              type.toLowerCase() === 'expense'
                ? 'flex__text flex__text--expense'
                : 'flex__text'
            }>
            {currency + ' ' + amount}
          </div>
        )}
      </CurrencyContext.Consumer>
      <div
        className={
          type.toLowerCase() === 'expense'
            ? 'flex__percentage flex__percentage--expense'
            : 'flex__percentage'
        }>
        {Math.ceil((parseInt(amount) / parseInt(total)) * 100)}%
      </div>
    </div>
  );
};
