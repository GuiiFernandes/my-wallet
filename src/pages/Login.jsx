import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  validInput = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email) && password.length >= MIN_LENGTH;
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
    const { email, password } = this.state;
    return (
      <section>
        <h1>My Wallet</h1>
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
          <button disabled={ !this.validInput() }>
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
