import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { isLoading } = this.props;
    return (
      <section>
        <div>
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
};

const mapStateToProps = ({ wallet: { isLoading } }) => ({
  isLoading,
});

export default connect(mapStateToProps)(Wallet);
