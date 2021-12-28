import { HTMLChakraProps, chakra, Stack, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'
import { PasswordInput } from '../../components/form/PasswordInput'

Yup.setLocale(pt)

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required()
}).required()

export type LoginFormData = Yup.InferType<typeof schema>

type Props = HTMLChakraProps<'form'> & {
  login: (data: LoginFormData) => Promise<void>
  loading: boolean
}

export const LoginForm = ({ loading, login, ...formProps }: Props) => {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (formData: LoginFormData) => login(formData)

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmit)}
      {...formProps}
    >
      <Stack spacing="6">
        <FormControl id="email" isRequired isInvalid={!!errors?.email}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
          {errors?.email && (
            <FormErrorMessage>
              {errors.email.message}
            </FormErrorMessage>
          )}

        </FormControl>

        <FormControl id="password" isRequired isInvalid={!!errors?.password}>
          <FormLabel>Senha</FormLabel>
          <PasswordInput id="password" autoComplete="password" {...register('password')} />
          {errors?.password && (
            <FormErrorMessage>
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isDisabled={isSubmitting || loading}
          isLoading={isSubmitting || loading}
        >
          Entrar
        </Button>
      </Stack>
    </chakra.form>
  )
}
