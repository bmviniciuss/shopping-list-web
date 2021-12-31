import React, { useMemo } from 'react'
import {
  useColorModeValue,
  Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, toast, useDisclosure, useToast
} from '@chakra-ui/react'
import SidebarWithHeader from '../../../layout/auth/AuthLayout'
import { useForm } from 'react-hook-form'
import { GetCategoriesDocument, GetCategoriesQuery, useCreateCategoryMutation, useGetCategoriesQuery } from '../../../generated/graphql'

type CreateCategoryDialogProps = {
  isOpen: boolean
  onClose: () => void
}

type CreateCategoryFormData = {
  name: string
  description?: string
}

export function CreateCategoryDialog ({ isOpen, onClose }: CreateCategoryDialogProps) {
  const toast = useToast()
  const [createCategory, { loading }] = useCreateCategoryMutation()
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<CreateCategoryFormData>()

  const isLoading = useMemo(() => {
    return loading || isSubmitting
  }, [loading, isSubmitting])

  const onSubmit = (formData: CreateCategoryFormData) => {
    console.log('DATA: ', formData)
    return createCategory({
      variables: {
        input: {
          name: formData.name,
          description: formData.description
        }
      },
      update (cache, { data }) {
        if (data?.CreateCategory?.id) {
          const { CreateCategory } = data
          const existingCategories = cache.readQuery<GetCategoriesQuery>({
            query: GetCategoriesDocument
          })
          if (existingCategories?.GetCategories) {
            const { GetCategories } = existingCategories

            cache.writeQuery({
              query: GetCategoriesDocument,
              data: {
                GetCategories: [CreateCategory, ...GetCategories]
              }
            })
          }
        }
      }
    }).then(({ data }) => {
      if (data?.CreateCategory) {
        const { CreateCategory } = data
        toast({
          title: 'Categoria Criada',
          description: `A categoria ${CreateCategory.name} foi criada com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        onClose()
      }
    }).catch(e => {
      toast({
        title: 'Erro ao criar categoria',
        description: `${e.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Nova Categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="6">

              <FormControl id="name" isRequired isInvalid={!!errors?.name}>
                <FormLabel htmlFor='name'>Nome Categoria</FormLabel>
                <Input id="name" type="text" {...register('name')} />
                {errors?.name && (
                  <FormErrorMessage>
                    {errors.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="description" isInvalid={!!errors?.description}>
                <FormLabel htmlFor='description'>Descrição</FormLabel>
                <Input id="description" type="text" {...register('description')} />
                {errors?.description && (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} isLoading={isLoading} isDisabled={isLoading}>
              Fechar
            </Button>
            <Button
              colorScheme='yellow'
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export function DashboardCategories () {
  const { data, loading } = useGetCategoriesQuery({
    fetchPolicy: 'cache-and-network'
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <SidebarWithHeader>
      <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading as={'h1'} fontSize={'4xl'} textColor={'gray.900'}>Categorias</Heading>
        <Button onClick={onOpen} size={'sm'} colorScheme={'teal'}>Criar Categoria</Button>
      </Box>
      {isOpen && <CreateCategoryDialog isOpen={isOpen} onClose={() => onClose()} />}
      {loading && <p>Loading...</p>}
      <SimpleGrid minChildWidth="200px" spacing={6} mt={8}>
        {!loading && data?.GetCategories?.map(category => {
          return (
            <Box
              key={category.id}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow='base'
              rounded='md'
              p={6}>
              <Heading as='h2' size='md' textColor={'gray.900'}>
                {category.name}
              </Heading>
            </Box>
          )
        })}
      </SimpleGrid>

    </SidebarWithHeader>
  )
}
