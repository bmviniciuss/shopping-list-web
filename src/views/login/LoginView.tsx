import React from 'react'
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  FlexProps,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { LoginForm } from './LoginForm'

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    py="8"
    px={{ base: '4', md: '10' }}
    shadow="base"
    rounded={{ sm: 'lg' }}
    {...props}
  />
)

export function LoginView () {
  return (
    <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
    <Box maxW="md" mx="auto">

      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Faça o seu Login
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Não tem uma conta?</Text>
        {/* <Link href="#">Criar conta gratuita</Link> */}
      </Text>
      <Card>
        <LoginForm />
      </Card>
    </Box>
  </Box>
  )
}
