import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from "apollo-link-http"

// The apollo client is created there then exported so we can
// wrap it around our root App object in index.js

const link = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ?
    'http://it2810-60.idi.ntnu.no:5000/graphql' :
    'http://localhost:5000/graphql'
})


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client