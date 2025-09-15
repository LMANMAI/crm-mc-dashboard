// src/pages/InsumosAdmin/index.tsx
import React from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Input,
  Button,
  InputGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaArchive } from "react-icons/fa";
import { Table, type Column } from "../../components/Table";

type Insumo = {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
};

const mock: Insumo[] = [
  { id: 1, codigo: "001", nombre: "Papel", precio: 0, stock: 8 },
  // agregá más si querés
];

const InsumosPage = () => {
  const rows = mock.map((r) => ({
    ...r,
    precioFmt: `$ ${r.precio.toFixed(2)}`,
    acciones: (
      <HStack gap="2" justify="flex-end">
        <IconButton aria-label="Editar" size="xs">
          <FaEdit />
        </IconButton>
        <IconButton aria-label="Eliminar" colorPalette="red" size="xs">
          <FaTrash />
        </IconButton>
        <IconButton aria-label="Movimientos" size="xs" colorPalette="gray">
          <FaArchive />
        </IconButton>
      </HStack>
    ),
  }));

  const columns: Column<(typeof rows)[number]>[] = [
    { header: "Código", accessor: "codigo" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Precio", accessor: "precioFmt", textAlign: "left" },
    { header: "Stock", accessor: "stock" },
    { header: "", accessor: "acciones", textAlign: "right" },
  ];

  return (
    <Box px={6} py={6}>
      <HStack mb={4} justify="space-between">
        <Heading size="lg">Insumos</Heading>

        <HStack gap="3">
          <InputGroup flex="1" maxW="360px" endElement={<FaSearch />}>
            <Input placeholder="Buscar..." size="sm" />
          </InputGroup>
          <Button size="sm" colorPalette="teal">
            <FaSearch /> Buscar
          </Button>
          <Button size="sm" colorPalette="teal">
            <FaPlus />
            Nuevo
          </Button>
        </HStack>
      </HStack>

      <Box borderWidth="1px" rounded="md" overflow="hidden">
        <Box bg="teal.500" color="white" px="4" py="2" fontWeight="bold">
          Insumos
        </Box>

        <Box p="4">
          <Table data={rows} columns={columns} rowKey="id" />

          <HStack justify="center" gap="2" mt="4">
            <Button size="xs" variant="outline">
              &laquo;
            </Button>
            <Button size="xs" variant="outline">
              &lt;
            </Button>
            <Button size="xs" colorPalette="teal">
              1
            </Button>
            <Button size="xs" variant="outline">
              &gt;
            </Button>
            <Button size="xs" variant="outline">
              &raquo;
            </Button>
          </HStack>

          <Text mt="3" fontSize="xs" color="gray.500">
            Hay {rows.length} resultado{rows.length !== 1 ? "s" : ""} en 1
            página
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default InsumosPage;
