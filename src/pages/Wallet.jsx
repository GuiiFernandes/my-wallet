import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    const { isLoading, isAPIFailure } = this.props;

    if (isAPIFailure) {
      return (
        <section>
          <h2>Erro ao carregar moedas!</h2>
          <p>Atualize a página ou tente novamente mais tarde.</p>
        </section>
      );
    }

    return (
      <section className={ styles.background }>
        <div className={ styles.header }>
          <Header />
          <WalletForm />
        </div>
        { isLoading ? (
          <section>
            <h1 data-testid="loading">Carregando...</h1>
          </section>
        ) : (<Table />)}
      </section>
    );
  }
}

Wallet.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAPIFailure: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet: { isLoading, isAPIFailure } }) => ({
  isLoading,
  isAPIFailure,
});

export default connect(mapStateToProps)(Wallet);
