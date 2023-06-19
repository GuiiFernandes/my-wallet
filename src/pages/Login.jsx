import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import { saveEmail } from '../redux/actions';
import logo from '../image/logo.svg';
import styles from './Login.module.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const MIN_LENGTH = 6;
    const { email, password } = this.state;
    return (
      <section className={ styles.login }>
        <div className={ styles.titleContainer }>
          <img src={ logo } alt="Logo" />
          <h1>My Wallet</h1>
        </div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleSubmit();
          } }
        >
          <input
            type="email"
            data-testid="email-input"
            name="email"
            id="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            id="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            required
          />
          <button disabled={ !(isEmail(email) && password.length >= MIN_LENGTH) }>
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
