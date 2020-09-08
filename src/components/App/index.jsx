import React, { Component } from 'react';
import './index.css';
import Header from '../User';
import { CurrencyContext } from '../contexts';
import Form from '../Form';
import DataGrid from '../DataGrid';
import Limiter from '../Limiter';
import Visualizer from '../Visualizer';
import { extractInputCategory, getTotal } from '../Library';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expLimit: 500000,
      currency: '$',
      datapoint: {
        income: {
          'Part Time Job': {
            id: 'Part Time Job',
            amount: [10000, 25000, 5000],
          },
          'Side Project': { id: 'Side Project', amount: [10000, 1000, 30000] },
          Blog: { id: 'Blog', amount: [10000, 25000, 1000] },
          Tutorials: { id: 'Tutorials', amount: [10000, 25000, 90000] },
        },
        expense: {
          Food: { id: 'Food', amount: [10000, 25000, 20000] },
          Clothes: { id: 'Clothes', amount: [10000, 25000, 6000] },
          Accessories: { id: 'Accessories', amount: [10000, 25000, 50000] },
          Rent: { id: 'Rent', amount: [10000, 25000, 30000] },
        },
      },
    };

    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onExpLimitChange = this.onExpLimitChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onSubmitAlert = this.onSubmitAlert.bind(this);
    this.onDeleteCategory = this.onDeleteCategory.bind(this);
  }

  onCurrencyChange(e) {
    this.setState({ currency: e.target.value });
  }

  onExpLimitChange(e) {
    this.setState({ expLimit: parseInt(e.target.value) });
  }

  onSubmitForm(type, category, amount) {
    this.setState((state) => {
      if (type !== '' && category !== '' && amount !== 0) {
        let data = state.datapoint[type][category].amount;
        data[data.length - 1] === 0
          ? (data[data.length - 1] = amount)
          : data.push(amount);
        console.log(data);
        let temp = type;
        type = '';
        category = '';
        amount = 0;
        let obj = {
          datapoint:
            temp === 'income'
              ? {
                  income: { ...data },
                  expense: state.datapoint.expense,
                }
              : {
                  income: state.datapoint.income,
                  expense: { ...data },
                },
        };
        return obj;
      } else return state;
    });
  }

  onSubmitAlert(type, category) {
    type = type.toLowerCase();
    this.setState((state) => {
      if (type !== '' && category !== '') {
        let data = state.datapoint[type];
        data[category] = { id: category, amount: [0] };
        let temp = type;
        type = '';
        category = '';
        let obj = {
          datapoint:
            temp === 'income'
              ? {
                  income: { ...data },
                  expense: state.datapoint.expense,
                }
              : {
                  income: state.datapoint.income,
                  expense: { ...data },
                },
        };
        return obj;
      } else return state;
    });
  }

  onDeleteCategory(type, category) {
    type = type.toLowerCase();
    this.setState((state) => {
      if (type !== '' && category !== '') {
        let data = state.datapoint[type];
        delete data[category];
        let temp = type;
        type = '';
        category = '';
        let obj = {
          datapoint:
            temp === 'income'
              ? { income: { ...data }, expense: state.datapoint.expense }
              : { income: state.datapoint.income, expense: { ...data } },
        };
        return obj;
      } else return state;
    });
  }

  render() {
    const { datapoint } = this.state;
    let income = extractInputCategory(datapoint.income);
    let expense = extractInputCategory(datapoint.expense);
    return (
      <CurrencyContext.Provider value={this.state.currency}>
        <Header
          currency={this.state.currency}
          onCurrencyChange={this.onCurrencyChange}
          onExpLimitChange={this.onExpLimitChange}
        />
        <Form income={income} expense={expense} onSubmit={this.onSubmitForm} />
        <div className='app__grid'>
          <DataGrid
            type='Income'
            data={datapoint.income}
            total={getTotal(datapoint.income)}
            onSubmit={this.onSubmitAlert}
            onDelete={this.onDeleteCategory}
          />
          <DataGrid
            type='Expense'
            data={datapoint.expense}
            total={getTotal(datapoint.expense)}
            onSubmit={this.onSubmitAlert}
            onDelete={this.onDeleteCategory}
          />
        </div>
        <Limiter
          incomeTotal={getTotal(datapoint.income)}
          expenseTotal={getTotal(datapoint.expense)}
          limit={this.state.expLimit}
        />
        <div className='app__grid'>
          <Visualizer type='Income' data={datapoint.income} />
          <Visualizer type='Expense' data={datapoint.expense} />
        </div>
      </CurrencyContext.Provider>
    );
  }
}

export default App;
