import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
