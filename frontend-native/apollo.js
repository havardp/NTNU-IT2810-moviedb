import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from "apollo-link-http"
import serverURL from "./serverURL.js"

// The apollo client is created there then exported so we can
// wrap it around our root App object in index.js

const link = createHttpLink({
  uri: serverURL + '/graphql'
})



const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client
