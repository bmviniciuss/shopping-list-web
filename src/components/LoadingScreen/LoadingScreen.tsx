import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

export function LoadingScreen () {
  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  )
}
