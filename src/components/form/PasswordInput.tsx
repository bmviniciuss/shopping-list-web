import { InputProps, InputGroup, Input, InputRightElement, Button, useMergeRefs, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const mergeRef = useMergeRefs(inputRef, ref)
  return (
    <InputGroup size='md'>
      <Input
        ref={mergeRef}
        pr='4.5rem'
        type={isOpen ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={() => { onToggle() }}>
          {isOpen ? 'Ocultar' : 'Mostrar'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})

PasswordInput.displayName = 'PasswordInput'
