import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getVisualizationData } from '../Library';
import { CurrencyContext } from '../contexts';
import './index.css';

const Visualizer = (props) => {
  let obj = getVisualizationData(props.data);
  return (
    <div className='visual__container'>
      <h2 className='visual__heading'>Average {props.type} of each category</h2>
      <div className='pie__chart'>
        <CurrencyContext.Consumer>
          {(currency) => (
            <PieChart
              data={obj}
              label={({ dataEntry }) => `${currency} ${dataEntry.value}`}
              labelStyle={{
                fontSize: '5px',
                fontWeight: 'bold',
              }}
              labelPosition={70}
              animate={true}
              radius={40}
            />
          )}
        </CurrencyContext.Consumer>
      </div>
      <Labeler
        colors={obj.map((e) => e.color)}
        values={obj.map((e) => e.value)}
        labels={Object.keys(props.data)}
      />
    </div>
  );
};

const Labeler = (props) => {
  const { colors, labels, values } = props;
  return (
    <div>
      {colors.map((color, i) => (
        <Label
          color={color}
          value={values[i]}
          label={labels[i]}
          key={labels[i]}
        />
      ))}
    </div>
  );
};

const Label = (props) => {
  const { color, label, value } = props;
  return (
    <div className='label__container'>
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: color,
          border: '1px solid black',
        }}></div>
      <div className='label__text'>{label}</div>
      <CurrencyContext.Consumer>
        {(currency) => (
          <div className='label__amount'>{currency + ' ' + value}</div>
        )}
      </CurrencyContext.Consumer>
    </div>
  );
};

export default Visualizer;
