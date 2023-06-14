import React from 'react';

import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Table />
      </section>
    );
  }
}

export default Wallet;
