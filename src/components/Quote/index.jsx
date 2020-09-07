import React, { Component } from 'react';
import { Feather } from 'react-feather';
import { QUOTES } from '../Library';
import './index.css';

export class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: Math.floor(Math.random() * Math.floor(QUOTES.length)),
    };
  }

  render() {
    const quote = QUOTES[this.state.index];
    return (
      <div className='quote'>
        <p className='quote__text'>" {quote.text} "</p>
        <hr className='quote__hr' />
        <div className='author'>
          <span className='author__name'>{quote.author}</span>{' '}
          <Feather className='author__icon' />
        </div>
      </div>
    );
  }
}
