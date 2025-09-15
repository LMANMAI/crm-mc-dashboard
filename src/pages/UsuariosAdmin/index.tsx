import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  IconButton,
  Stack,
  Tag,
} from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components";
type UsuarioRow = {
  id: number;
  nombre: string;
  usuario: string;
  nivel: string;
  activo: boolean;
};

const MOCK: UsuarioRow[] = [
  {
    id: 1,
    nombre: "Administrador",
    usuario: "admin",
    nivel: "SuperAdm",
    activo: true,
  },
  {
    id: 2,
    nombre: "Andrea",
    usuario: "andre",
    nivel: "SuperAdm",
    activo: true,
  },
  { id: 3, nombre: "Brian", usuario: "brian", nivel: "SuperAdm", activo: true },
  { id: 4, nombre: "Denu", usuario: "Denu", nivel: "SuperAdm", activo: true },
  { id: 5, nombre: "Emi", usuario: "emi", nivel: "SuperAdm", activo: true },
  {
    id: 6,
    nombre: "facundo acc",
    usuario: "facu",
    nivel: "SuperAdm",
    activo: true,
  },
  { id: 7, nombre: "Fer", usuario: "fer", nivel: "SuperAdm", activo: true },
  { id: 8, nombre: "Joni", usuario: "joni", nivel: "Producción", activo: true },
  {
    id: 9,
    nombre: "Marcelo operador",
    usuario: "marcelo operador 2",
    nivel: "SuperAdm",
    activo: true,
  },
  {
    id: 10,
    nombre: "Marian",
    usuario: "marian",
    nivel: "SuperAdm",
    activo: true,
  },
  { id: 11, nombre: "Mavi", usuario: "mavi", nivel: "SuperAdm", activo: true },
  {
    id: 12,
    nombre: "Seba",
    usuario: "seba",
    nivel: "Producción",
    activo: true,
  },
  {
    id: 13,
    nombre: "Sofia",
    usuario: "Sofia",
    nivel: "Vacaciones",
    activo: true,
  },
];

const UsuariosAdminPage: React.FC = () => {
  const [rows] = React.useState<UsuarioRow[]>(MOCK);

  const handleNuevo = () => {
    console.log("Nuevo usuario");
  };

  const handleEditar = (row: UsuarioRow) => {
    console.log("Editar", row);
  };

  const handleEliminar = (row: UsuarioRow) => {
    console.log("Eliminar", row);
  };

  const yesNoTag = (value: boolean) => (
    <Tag.Root
      size="sm"
      variant="subtle"
      colorPalette={value ? "teal" : "gray"}
      minW="10"
      justifyContent="center"
    >
      <Tag.Label>{value ? "Si" : "No"}</Tag.Label>
    </Tag.Root>
  );

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Usuario", accessor: "usuario" },
    { header: "Nivel", accessor: "nivel" },
    { header: "Activo", accessor: "activo", textAlign: "center" as const },
    { header: "", accessor: "actions", textAlign: "center" as const },
  ];

  const dataForTable = rows.map((u) => ({
    ...u,
    activo: yesNoTag(u.activo),
    actions: (
      <HStack justify="center" gap={2}>
        <IconButton
          aria-label="Editar"
          size="xs"
          variant="subtle"
          colorPalette="teal"
          onClick={() => handleEditar(u)}
        >
          <FaEdit />
        </IconButton>
        <IconButton
          aria-label="Eliminar"
          size="xs"
          variant="subtle"
          colorPalette="red"
          onClick={() => handleEliminar(u)}
        >
          <FaTrash />
        </IconButton>
      </HStack>
    ),
  }));

  return (
    <Box p={4}>
      <Flex align="center" justify="space-between" mb={4} wrap="wrap" gap={3}>
        <Heading as="h2" size="md">
          Usuarios
        </Heading>

        <Button size="sm" colorPalette="teal" onClick={handleNuevo}>
          <FaPlus /> Nuevo
        </Button>
      </Flex>

      <Stack bg="white" p={4} rounded="md" shadow="sm">
        <Table data={dataForTable} columns={columns} rowKey="id" size="sm" />
      </Stack>
    </Box>
  );
};

export default UsuariosAdminPage;
