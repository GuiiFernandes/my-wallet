import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import styles from './App.module.css';

function App() {
  return (
    <main className={ styles.page }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </main>
  );
}

export default App;
