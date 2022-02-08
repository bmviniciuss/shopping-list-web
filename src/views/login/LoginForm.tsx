/* eslint-disable react/prop-types */
import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import Input from '../../components/form/Input'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email().nonempty({ message: 'Required' }),
  password: z.string().nonempty({ message: 'Required' })
})

export type LoginFormData = z.infer<typeof loginSchema>;

type Props = {
  loading?: boolean
  login: (data: LoginFormData) => Promise<void>
}

export const LoginForm = ({ login, loading }: Props) => {
  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (formData: LoginFormData) => login(formData).catch(e => {
    form.setError('password', { message: 'Email ou senha inválido' })
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack spacing={5} display={'flex'} alignItems={'flex-start'}>

          <Input
            isRequired
            label='Email'
            placeholder='example@example.com'
            type="text"
            {...form.register('email')}
          />

          <Input
            isRequired
            label='Senha'
            type="password"
            {...form.register('password')}
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            isDisabled={loading}
            isLoading={loading}
          >
            Entrar
          </Button>

        </VStack>

      </form>
    </FormProvider>
  )
}
