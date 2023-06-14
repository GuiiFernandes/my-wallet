import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <h1>My Wallet</h1>
          <div>
            <p>
              <span data-testid="total-field">0</span>
              {' '}
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
          <div>
            <p data-testid="email-field">{email}</p>
          </div>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Header);
