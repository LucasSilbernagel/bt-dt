import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL })

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})
