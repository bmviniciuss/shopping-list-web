/* eslint-disable react/prop-types */
import { Button, FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm, UseFormReturn, UseFormProps, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const loginSchema = z.object({
  name: z.string().nonempty({ message: 'Required' })
})

interface FormProps {
  form: UseFormReturn
  onSubmit: (data: any) => any | Promise<any>
  children: React.ReactNode
}

interface UseZodFormProps extends UseFormProps {
  schema: any
}

export const useZodForm = ({
  schema,
  ...formConfig
}: UseZodFormProps) => {
  return useForm({
    ...formConfig,
    resolver: zodResolver(schema)
  })
}

const Form = ({ form, onSubmit, children }: FormProps) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

interface InputProps extends ChakraInputProps {
  label?: string
}

const useFieldError = (name: string | undefined) => {
  const form = useFormContext()
  if (!name) return null
  return form?.formState?.errors?.[name] ?? null
}

const Input = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    const error = useFieldError(props.name)
    console.log('ERROR:', error)

    return (
      <FormControl isInvalid={!!error}>
        <ChakraInput ref={ref} {...props} />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage> }
      </FormControl>
    )
  }
))

Input.displayName = 'Input'

export const LoginForm = () => {
  const form = useZodForm({
    schema: loginSchema
  })

  // const onSubmit = async (formData: LoginFormData) => login(formData).catch(e => {
  //   setError('password', { message: 'Email ou senha inválido' })
  // })

  return (
    <Form form={form} onSubmit={(data) => {
      console.log('DATA: ', data)
    }}>
      <Input

        {...form.register('name')}
      />

      <Button
        type="submit"
        colorScheme="blue"
        size="lg"
        fontSize="md"

      >
        Entrar
      </Button>
    </Form>
    // <chakra.form
    //   onSubmit={handleSubmit(onSubmit)}
    //   {...formProps}
    // >
    //   <Stack spacing="6">
    //     Form
    //     <FormControl id="email" isRequired isInvalid={!!errors?.email}>
    //       <FormLabel htmlFor='email'>Email</FormLabel>
    //       <Input id="email" type="email" autoComplete="email" {...register('email')} />
    //       {errors?.email && (
    //         <FormErrorMessage>
    //           {errors.email.message}
    //         </FormErrorMessage>
    //       )}

  //     </FormControl>

  //     <FormControl id="password" isRequired isInvalid={!!errors?.password}>
  //       <FormLabel>Senha</FormLabel>
  //       <PasswordInput id="password" autoComplete="password" {...register('password')} />
  //       {errors?.password && (
  //         <FormErrorMessage>
  //           {errors.password.message}
  //         </FormErrorMessage>
  //       )}
  //     </FormControl>

  //     <Button
  //       type="submit"
  //       colorScheme="blue"
  //       size="lg"
  //       fontSize="md"
  //       isDisabled={isSubmitting || loading}
  //       isLoading={isSubmitting || loading}
  //     >
  //       Entrar
  //     </Button>
  //   </Stack>
  // </chakra.form>
  )
}
