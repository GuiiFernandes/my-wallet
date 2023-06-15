import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { tableHeaders } from '../helpers';

class Table extends Component {
  calculateAndTotal = (value, ask = 1) => {
    const total = Number(ask) * Number(value);
    return total.toFixed(2);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => <th key={ header }>{ header }</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{this.calculateAndTotal(value)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{this.calculateAndTotal(exchangeRates[currency].ask)}</td>
                <td>
                  {this.calculateAndTotal(value, exchangeRates[currency].ask)}
                </td>
                <td>Real</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
