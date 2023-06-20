import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies, modifyExpenses } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';
import styles from './WalletForm.module.css';

const alimentacao = 'Alimentação';
const dinheiro = 'Dinheiro';

class WalletForm extends Component {
  state = { updated: true,
    form: {
      value: '',
      currency: '',
      method: dinheiro,
      tag: alimentacao,
      description: '',
    } };

  async componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    await dispatchFetchCurrencies();
    const { currencies } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      form: { ...prevState.form, currency: currencies[0] },
    }));
  }

  componentDidUpdate() {
    const { updated } = this.state;
    const { editor, expenses, idToEdit } = this.props;
    if (editor && updated) {
      const { value, currency, method, tag, description } = expenses
        .find(({ id }) => id === idToEdit);
      this.setState(() => ({
        updated: false,
        form: {
          value,
          currency,
          method,
          tag,
          description,
        },
      }));
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ updated, form }) => ({
      updated,
      form: { ...form, [name]: value },
    }));
  };

  sendToGlobalState = (newExpenses) => {
    const { dispatchModifyExpenses, currencies } = this.props;
    dispatchModifyExpenses(newExpenses);
    this.setState({ updated: true,
      form: {
        value: '',
        currency: currencies[0],
        method: dinheiro,
        tag: alimentacao,
        description: '',
      } });
  };

  addNewExpense = async (form) => {
    const { expenses } = this.props;
    const exchangeRates = await fetchAPI();
    const newExpenses = [...expenses,
      {
        ...form,
        id: expenses.length ? expenses[expenses.length - 1].id + 1 : 0,
        exchangeRates,
      }];
    this.sendToGlobalState(newExpenses);
  };

  saveEditExpense = (form) => {
    const { idToEdit, expenses } = this.props;
    const newExpenses = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        return { ...expense, ...form };
      }
      return expense;
    });
    this.sendToGlobalState(newExpenses);
  };

  handleSubmit = async () => {
    const { form } = this.state;
    const { editor } = this.props;
    if (editor) {
      this.saveEditExpense(form);
    } else {
      await this.addNewExpense(form);
    }
  };

  render() {
    const { form: { description, value, currency, method, tag } } = this.state;
    const methods = [dinheiro, 'Cartão de crédito', 'Cartão de débito'];
    const tags = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies, editor } = this.props;

    return (
      <form
        className={ styles.form }
        onSubmit={ (e) => {
          e.preventDefault();
          this.handleSubmit();
        } }
      >
        <label htmlFor="description">
          Descrição:
          <input
            className={ styles.inputForm }
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="tag">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            className={ styles.inputForm }
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            id="tag"
          >
            {tags.map((tagSelect) => (
              <option key={ tagSelect } value={ tagSelect }>{tagSelect}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            className={ styles.inputForm }
            type="number"
            name="value"
            min="0"
            step="0.01"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            className={ styles.inputForm }
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency"
          >
            {currencies.map((currencyMap) => (
              <option key={ currencyMap } value={ currencyMap }>{currencyMap}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            className={ styles.inputForm }
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            id="method"
          >
            {methods.map((methodSelect) => (
              <option key={ methodSelect } value={ methodSelect }>{methodSelect}</option>
            ))}
          </select>
        </label>
        <button
          className={ styles.btnForm }
        >
          {`${editor ? 'Editar' : 'Adicionar'} Despesa`}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  dispatchModifyExpenses: PropTypes.func.isRequired,

};

const mapStateToProps = ({ wallet: { editor, idToEdit, currencies, expenses } }) => ({
  currencies,
  expenses,
  editor,
  idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchModifyExpenses: (expenses) => dispatch(modifyExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
