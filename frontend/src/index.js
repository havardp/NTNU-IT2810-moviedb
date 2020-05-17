import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import client from './apollo'
import { ApolloProvider } from '@apollo/react-hooks'

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </ApolloProvider>
  , document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App/App.js', () => {
      const NextRoot = require('./App/App').default
      ReactDOM.render(<NextRoot />, document.getElementById('root'));
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
