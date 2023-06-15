import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';

import { tableHeaders } from '../helpers';
import { modifyExpenses } from '../redux/actions';

class Table extends Component {
  calculateAndTotal = (value, ask = 1) => {
    const total = Number(ask) * Number(value);
    return total.toFixed(2);
  };

  handleDelete = (id) => {
    const { expenses, dispatchModifyExpenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatchModifyExpenses(newExpenses);
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
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(id) }
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  dispatchModifyExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchModifyExpenses: (expenses) => dispatch(modifyExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
