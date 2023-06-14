import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    currency: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatchFetchCurrencies, currencies } = this.props;
    dispatchFetchCurrencies();
    this.setState((prevState) => ({ ...prevState, currency: currencies[0] }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;

    return (
      <form>
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
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
