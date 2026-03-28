import React from 'react';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { FaPlus, FaSearch } from 'react-icons/fa';

interface AdminPageToolbarProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNewClick: () => void;
}

const AdminPageToolbar: React.FC<AdminPageToolbarProps> = ({
  title,
  searchValue,
  onSearchChange,
  onNewClick,
}) => {
  return (
    <Box
      bg="teal.500"
      color="white"
      px={4}
      py={3}
      rounded="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontWeight="semibold">{title}</Text>

      <HStack gap={2}>
        <HStack
          bg="white"
          rounded="md"
          border="1px solid"
          borderColor="gray.200"
          px={2}
          py={1}
        >
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar..."
            size="sm"
            border="none"
            _focusVisible={{ boxShadow: 'none' }}
            minW={{ base: '160px', md: '260px' }}
            color="black"
          />
          <IconButton aria-label="Buscar" size="xs" variant="ghost">
            <FaSearch />
          </IconButton>
        </HStack>

        <Button
          size="sm"
          bg="teal.600"
          _hover={{ bg: 'teal.700' }}
          onClick={onNewClick}
        >
          <FaPlus /> Nuevo
        </Button>
      </HStack>
    </Box>
  );
};

export default AdminPageToolbar;
