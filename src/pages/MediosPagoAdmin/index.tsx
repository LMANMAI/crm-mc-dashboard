import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  IconButton,
  Button,
  Stack,
  Tag,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components";

type MedioPago = {
  id: number;
  nombre: string;
  aplicaCaja: boolean;
  aplicaClientes: boolean;
};

const MOCK: MedioPago[] = [
  { id: 1, nombre: "Cabal crédito", aplicaCaja: true, aplicaClientes: false },
  { id: 2, nombre: "Cheque", aplicaCaja: true, aplicaClientes: true },
  {
    id: 3,
    nombre: "Cuenta Corriente",
    aplicaCaja: true,
    aplicaClientes: false,
  },
  { id: 4, nombre: "Efectivo", aplicaCaja: true, aplicaClientes: true },
  {
    id: 5,
    nombre: "Master Card crédito",
    aplicaCaja: true,
    aplicaClientes: false,
  },
  { id: 6, nombre: "Mercadopago", aplicaCaja: true, aplicaClientes: true },
  { id: 7, nombre: "Retenciones", aplicaCaja: true, aplicaClientes: false },
  {
    id: 8,
    nombre: "Transferencia Banco Frances",
    aplicaCaja: true,
    aplicaClientes: false,
  },
  { id: 9, nombre: "Visa crédito", aplicaCaja: true, aplicaClientes: false },
  { id: 10, nombre: "Visa débito", aplicaCaja: true, aplicaClientes: false },
];

const MediosPagoAdmin: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState<MedioPago[]>(MOCK);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((m) => m.nombre.toLowerCase().includes(q));
  }, [data, query]);

  const handleNuevo = () => {
    console.log("Nuevo medio de pago");
  };

  const handleEditar = (row: MedioPago) => {
    console.log("Editar", row);
  };

  const handleEliminar = (row: MedioPago) => {
    console.log("Eliminar", row);
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    {
      header: "Aplica a caja",
      accessor: "aplicaCaja",
      textAlign: "center" as const,
    },
    {
      header: "Aplica a clientes",
      accessor: "aplicaClientes",
      textAlign: "center" as const,
    },
    { header: "", accessor: "actions", textAlign: "center" as const },
  ];

  const yesNoTag = (value: boolean) => (
    <Tag.Root
      size="sm"
      variant="subtle"
      colorPalette={value ? "teal" : "gray"}
      justifyContent="center"
      minW="10"
    >
      <Tag.Label>{value ? "Si" : "No"}</Tag.Label>
    </Tag.Root>
  );

  const tableData = filtered.map((m) => ({
    ...m,
    aplicaCaja: yesNoTag(m.aplicaCaja),
    aplicaClientes: yesNoTag(m.aplicaClientes),
    actions: (
      <HStack justify="center" gap={2}>
        <IconButton
          aria-label="Editar"
          size="xs"
          variant="subtle"
          colorPalette="teal"
          onClick={() => handleEditar(m)}
        >
          <FaEdit />
        </IconButton>
        <IconButton
          aria-label="Eliminar"
          size="xs"
          variant="subtle"
          colorPalette="red"
          onClick={() => handleEliminar(m)}
        >
          <FaTrash />
        </IconButton>
      </HStack>
    ),
  }));

  return (
    <Box p={4}>
      <Flex align="center" justify="space-between" gap={4} wrap="wrap" mb={4}>
        <Heading as="h2" size="md">
          Módulo de medios de pago
        </Heading>

        <HStack gap={2} wrap="wrap">
          <HStack gap={2}>
            <Input
              size="sm"
              w={{ base: "full", md: "320px" }}
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton aria-label="Buscar" size="sm" variant="subtle">
              <FaSearch />
            </IconButton>
          </HStack>
          <Button size="sm" colorPalette="teal" onClick={handleNuevo}>
            <FaPlus /> Nuevo
          </Button>
        </HStack>
      </Flex>

      <Stack bg="white" p={4} rounded="md" shadow="sm">
        <Table data={tableData} columns={columns} rowKey="id" size="sm" />
      </Stack>
    </Box>
  );
};

export default MediosPagoAdmin;
