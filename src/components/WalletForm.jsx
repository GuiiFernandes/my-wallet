import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies, modifyExpenses } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';

const alimentacao = 'Alimentação';
const dinheiro = 'Dinheiro';

class WalletForm extends Component {
  state = {
    value: '',
    currency: '',
    method: dinheiro,
    tag: alimentacao,
    description: '',
  };

  async componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    await dispatchFetchCurrencies();
    const { currencies } = this.props;
    this.setState((prevState) => ({ ...prevState, currency: currencies[0] }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { state } = this;
    const { dispatchModifyExpenses, expenses, currencies } = this.props;
    const quotes = await fetchAPI();
    const newExpenses = [...expenses,
      {
        ...state,
        id: expenses.length ? expenses[expenses.length - 1].id + 1 : 0,
        exchangeRates: quotes,
      }];
    dispatchModifyExpenses(newExpenses);
    this.setState({
      value: '',
      currency: currencies[0],
      method: dinheiro,
      tag: alimentacao,
      description: '',
    });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const methods = [dinheiro, 'Cartão de crédito', 'Cartão de débito'];
    const tags = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;

    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          this.handleSubmit();
        } }
      >
        <label htmlFor="description">
          Descrição:
          <input
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
          <select
            data-testid="tag-input"
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
          <input
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
        <button>Adicionar Despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  dispatchModifyExpenses: PropTypes.func.isRequired,

};

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchModifyExpenses: (expenses) => dispatch(modifyExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
