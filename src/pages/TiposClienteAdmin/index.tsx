import React from "react";
import {
  Box,
  Stack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  Tag,
} from "@chakra-ui/react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components";

type TipoCliente = {
  id: number;
  nombre: string;
  markup: string;
  publico: boolean;
  gremio: boolean;
  creditoMax: string;
};

const mockData: TipoCliente[] = [
  {
    id: 1,
    nombre: "Cliente final",
    markup: "0.00 %",
    publico: true,
    gremio: false,
    creditoMax: "-",
  },
  {
    id: 2,
    nombre: "Cliente gremio",
    markup: "0.00 %",
    publico: false,
    gremio: true,
    creditoMax: "-",
  },
  {
    id: 3,
    nombre: "Cliente diseño",
    markup: "0.00 %",
    publico: false,
    gremio: false,
    creditoMax: "-",
  },
  {
    id: 4,
    nombre: "Empleado",
    markup: "0.00 %",
    publico: false,
    gremio: false,
    creditoMax: "-",
  },
];

const TiposClienteAdminPage: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const data = React.useMemo(() => {
    if (!search.trim()) return mockData;
    const q = search.toLowerCase();
    return mockData.filter((d) => d.nombre.toLowerCase().includes(q));
  }, [search]);

  const columns = [
    { header: "Nombre", accessor: "nombre", textAlign: "left" as const },
    {
      header: "Markup general",
      accessor: "markup",
      textAlign: "left" as const,
    },
    {
      header: "Cliente público",
      accessor: "publico",
      textAlign: "left" as const,
    },
    {
      header: "Cliente gremio",
      accessor: "gremio",
      textAlign: "left" as const,
    },
    {
      header: "Crédito máximo",
      accessor: "creditoMax",
      textAlign: "left" as const,
    },
    {
      header: "",
      accessor: "actions",
      textAlign: "center" as const,
    },
  ];

  const tableData = data.map((row) => ({
    ...row,
    publico: (
      <Tag.Root
        size="sm"
        variant="subtle"
        colorPalette={row.publico ? "green" : "gray"}
      >
        <Tag.Label>{row.publico ? "Sí" : "No"}</Tag.Label>
      </Tag.Root>
    ),
    gremio: (
      <Tag.Root
        size="sm"
        variant="subtle"
        colorPalette={row.gremio ? "green" : "gray"}
      >
        <Tag.Label>{row.gremio ? "Sí" : "No"}</Tag.Label>
      </Tag.Root>
    ),
    actions: (
      <HStack justify="center" gap={2}>
        <IconButton
          aria-label="Editar"
          size="xs"
          variant="subtle"
          colorPalette="teal"
        >
          <FaEdit />
        </IconButton>

        <IconButton
          aria-label="Eliminar"
          size="xs"
          variant="subtle"
          colorPalette="teal"
        >
          <FaTrash />
        </IconButton>
      </HStack>
    ),
  }));

  return (
    <Stack px={6} py={6} gap={6}>
      <HStack justify="space-between">
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          Módulo de administración de tipos de clientes
        </Text>
        <HStack gap={2}>
          <HStack>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              size="sm"
              w={{ base: "220px", md: "320px" }}
            />
            <Button size="sm">
              <FaSearch /> Buscar
            </Button>
          </HStack>
          <Button size="sm" colorPalette="teal">
            <FaPlus /> Nuevo
          </Button>
        </HStack>
      </HStack>
      <Box borderWidth="1px" rounded="md" overflow="hidden">
        <Box bg="teal.500" color="white" px={4} py={2} fontWeight="bold">
          Tipos de clientes
        </Box>

        <Box p={3} overflowX="auto">
          <Table data={tableData} columns={columns} rowKey="id" />
        </Box>

        <Box bg="gray.100" px={4} py={2}>
          <HStack gap={2}>
            <Button size="xs" variant="outline">
              {"«"}
            </Button>
            <Button size="xs" colorPalette="teal">
              1
            </Button>
            <Button size="xs" variant="outline">
              {"»"}
            </Button>
          </HStack>
        </Box>
      </Box>
    </Stack>
  );
};

export default TiposClienteAdminPage;
