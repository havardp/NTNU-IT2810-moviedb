import React from 'react';
import client from './apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import StackNavigator from './src/StackNavigation.js'
import { View } from 'react-native';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StackNavigator />
    </ApolloProvider>
  );
}
