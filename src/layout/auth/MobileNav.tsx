import {
  FlexProps,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import React from 'react'
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../../context/auth'

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export function MobileNav ({ onOpen, ...rest }: MobileProps) {
  const bgColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const auth = useAuth()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          {auth.currentUser && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    name={auth.currentUser.name}
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{auth.currentUser.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {auth.currentUser.email}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={bgColor}
                borderColor={borderColor}>
                <MenuItem isDisabled>Perfil</MenuItem>
                <MenuItem isDisabled>Configurações</MenuItem>
                <MenuDivider />
                <MenuItem isDisabled>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}

        </Flex>
      </HStack>
    </Flex>
  )
}
