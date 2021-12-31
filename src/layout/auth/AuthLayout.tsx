import { useDisclosure, Box, useColorModeValue, Drawer, DrawerContent } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { MobileNav } from './MobileNav'
import { SidebarContent } from './SidebarContent'

export default function SidebarWithHeader ({
  children
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={10}>
        {children}
      </Box>
    </Box>
  )
}
