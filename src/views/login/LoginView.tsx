import React from 'react'
import {
  Box,
  BoxProps,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { LoginForm, LoginFormData } from './LoginForm'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useLoginUserMutation } from '../../generated/graphql'

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
  const navigate = useNavigate()
  const location = useLocation()

  // @ts-ignore
  const from = location?.state?.from?.pathname || '/'

  const auth = useAuth()
  const [loginMutation, { loading }] = useLoginUserMutation({
    notifyOnNetworkStatusChange: true
  })

  const login = async (formData: LoginFormData) => loginMutation({
    variables: { input: formData }
  }).then(({ data }) => {
    if (data?.LoginUser?.accessToken && data?.LoginUser?.user) {
      auth.localLogin(data.LoginUser.accessToken, data.LoginUser.user)
      navigate(from, { replace: true })
    }
  })

  return (
    <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
    <Box maxW="md" mx="auto">
    loading: { loading ? 'true' : 'false' }
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Faça o seu Login
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Não tem uma conta?</Text>
        {/* <Link href="#">Criar conta gratuita</Link> */}
      </Text>
      <Card>
        <LoginForm login={login} loading={loading}/>
      </Card>
    </Box>
  </Box>
  )
}
