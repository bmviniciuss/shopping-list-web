/* eslint-disable react/prop-types */
import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  label?: string
  isRequired?: boolean
}

const useFieldError = (name: string | undefined) => {
  const form = useFormContext()
  if (!name) return null
  return form?.formState?.errors?.[name] ?? null
}

const Input = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, isRequired = false, ...props }, ref) => {
    const error = useFieldError(props.name)

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
        <ChakraInput ref={ref} {...props} />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }
))

Input.displayName = 'Input'

export {
  Input
}
