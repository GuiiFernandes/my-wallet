import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsCashCoin } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

import styles from './Header.module.css';
import logo from '../images/logo.svg';

class Header extends Component {
  sumTotal = () => {
    const { expenses } = this.props;
    const total = expenses
      .reduce((sum, { value, currency, exchangeRates }) => {
        const convetedValue = Number(value) * Number(exchangeRates[currency].ask);
        return sum + convetedValue;
      }, 0);
    return total.toFixed(2);
  };

  render() {
    const { user } = this.props;
    const { photoURL, displayName } = user;
    return (
      <header className={ styles.header }>
        <div className={ styles.titleContainer }>
          <img className={ styles.logo } src={ logo } alt="logo" />
          <h1 className={ styles.title }>My Wallet</h1>
        </div>
        <div className={ styles.total }>
          <BsCashCoin size="2.5rem" />
          <p>
            <strong>Despesa Total:</strong>
            {' '}
            <span data-testid="total-field">
              { this.sumTotal() }
            </span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div className={ styles.user }>
          { photoURL ? (
            <img src={ photoURL } alt="user" className={ styles.img } />
          ) : (
            <CgProfile size="40px" />
          )}
          <p data-testid="email-field">{displayName}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

const mapStateToProps = ({ user, wallet: { expenses } }) => ({
  user,
  expenses,
});

export default connect(mapStateToProps)(Header);
