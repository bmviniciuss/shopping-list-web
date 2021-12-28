import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './router/Router'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './graphql/makeApolloClient'
import { AuthProvider } from './context/auth'

function App () {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ChakraProvider>
          <CSSReset />
          <Router />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
