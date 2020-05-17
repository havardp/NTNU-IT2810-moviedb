import React from 'react';
import { Switch } from 'react-router-dom';
import Home from './pages/Home'

function App() {
  return (
    <div>
    <Switch>
      <Home />
    </Switch>
  </div>
  );
}

export default App;
