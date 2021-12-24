import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Router } from './router/Router'

function App () {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router/>
    </ChakraProvider>
  )
}

export default App
