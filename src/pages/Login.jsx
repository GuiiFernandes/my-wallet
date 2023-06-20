import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

import { saveEmail } from '../redux/actions';
import logo from '../images/logo.svg';
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
    const TIME_OUT = 700;
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveEmail(email));
    const title = document.getElementById('title');
    const imgTitle = document.getElementById('imgTitle');
    const form = document.querySelector('form');
    form.classList.add(styles.goWalletForm);
    title.classList.add(styles.goWallet);
    imgTitle.classList.add(styles.goWallet);
    setTimeout(() => {
      history.push('/carteira');
    }, TIME_OUT);
  };

  render() {
    const MIN_LENGTH = 6;
    const { email, password } = this.state;
    return (
      <section className={ styles.login }>
        <div className={ styles.titleContainer }>
          <img className={ styles.logo } id="title" src={ logo } alt="Logo" />
          <h1 className={ styles.title } id="imgTitle">My Wallet</h1>
        </div>
        <form
          className={ styles.form }
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleSubmit();
          } }
        >
          <label htmlFor="email" className={ styles.labelInput }>
            <MdAlternateEmail size="4rem" />
            <input
              className={ styles.inputLogin }
              type="email"
              data-testid="email-input"
              name="email"
              id="email"
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="password" className={ styles.labelInput }>
            <RiLockPasswordLine size="4rem" />
            <input
              className={ styles.inputLogin }
              type="password"
              data-testid="password-input"
              name="password"
              id="password"
              placeholder="Senha"
              value={ password }
              onChange={ this.handleChange }
              required
            />
          </label>
          <button
            className={ styles.btnLogin }
            disabled={ !(isEmail(email) && password.length >= MIN_LENGTH) }
          >
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
