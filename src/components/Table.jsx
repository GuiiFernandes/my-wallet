import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { tableHeaders } from '../helpers';
import { editExpense, modifyExpenses } from '../redux/actions';
import styles from './Table.module.css';

class Table extends Component {
  calculateAndTotal = (value, ask = 1) => {
    const total = Number(ask) * Number(value);
    return total.toFixed(2);
  };

  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(modifyExpenses(newExpenses));
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className={ styles.table }>
        <thead>
          <tr className={ styles.headerRow }>
            {tableHeaders.map((header) => (
              <th
                className={ styles.headerItem }
                key={ header }
              >
                { header }
              </th>))}
          </tr>
        </thead>
        <tbody className={ styles.bodyTable }>
          {expenses
            .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
              <tr className={ styles.bodyRow } key={ id }>
                <td className={ styles.bodyItem }>{description}</td>
                <td className={ styles.bodyItem }>{tag}</td>
                <td className={ styles.bodyItem }>{method}</td>
                <td className={ styles.bodyItem }>{this.calculateAndTotal(value)}</td>
                <td className={ styles.bodyItem }>
                  {exchangeRates[currency].name.split('/')[0]}
                </td>
                <td className={ styles.bodyItem }>
                  {this.calculateAndTotal(exchangeRates[currency].ask)}
                </td>
                <td className={ styles.bodyItem }>
                  {this.calculateAndTotal(value, exchangeRates[currency].ask)}
                </td>
                <td className={ styles.bodyItem }>Real</td>
                <td className={ styles.bodyItem }>
                  <button
                    className={ styles.btn }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(id)) }
                  >
                    <MdEdit size="3rem" />
                  </button>
                  <button
                    className={ styles.btn }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(id) }
                  >
                    <MdDeleteForever size="3rem" />
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
