import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotal = () => {
    const { expenses } = this.props;
    const total = expenses.length
      ? expenses
        .reduce((sum, { value, currency, exchangeRates }) => {
          const convetedValue = value * exchangeRates[currency].ask;
          return sum + convetedValue;
        }, 0) : 0;
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>My Wallet</h1>
        <div>
          <p>
            <span data-testid="total-field">
              { this.sumTotal() }
            </span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div>
          <p data-testid="email-field">{email}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
