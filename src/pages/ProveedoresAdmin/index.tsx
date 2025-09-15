import React from "react";
import {
  Box,
  Stack,
  Flex,
  Heading,
  Input,
  Button,
  HStack,
  IconButton,
  Tag,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components";

type Proveedor = {
  id: number;
  nombre: string;
  email: string;
  direccion: string;
  localidad: string;
  razon: string;
  telefono: string;
  celular: string;
  cuit: string;
  condicion: string;
};

const MOCK: Proveedor[] = [
  {
    id: 1,
    nombre: "Bertolin",
    email: "paperbolin@yahoo.com.es",
    direccion: "Concordia 1164",
    localidad: "Capital Federal",
    razon: "Juan Franco Bertolin",
    telefono: "46742472",
    celular: "11327559041",
    cuit: "20935729662",
    condicion: "Responsable Inscripto",
  },
  {
    id: 2,
    nombre: "Coproid SA",
    email: "ventas@coproid.com.ar",
    direccion: "Montenegro 1482",
    localidad: "CABA",
    razon: "COPROID SA",
    telefono: "43017548",
    celular: "307092475544",
    cuit: "307092475544",
    condicion: "Responsable Inscripto",
  },
];

const ProveedoresAdminPage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState<Proveedor[]>(MOCK);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.razon.toLowerCase().includes(q) ||
        p.cuit.toLowerCase().includes(q)
    );
  }, [data, query]);

  const handleNuevo = () => {
    console.log("Nuevo proveedor");
  };

  const handleEditar = (row: Proveedor) => {
    console.log("Editar", row);
  };

  const handleEliminar = (row: Proveedor) => {
    console.log("Eliminar", row);
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Email", accessor: "email" },
    { header: "Dirección", accessor: "direccion" },
    { header: "Localidad", accessor: "localidad" },
    { header: "Razón", accessor: "razon" },
    { header: "Teléfono", accessor: "telefono", textAlign: "right" as const },
    { header: "Celular", accessor: "celular", textAlign: "right" as const },
    { header: "CUIT", accessor: "cuit", textAlign: "right" as const },
    { header: "Condición", accessor: "condicion" },
    { header: "", accessor: "actions", textAlign: "center" as const },
  ];

  const tableData = filtered.map((p) => ({
    ...p,
    condicion: (
      <Tag.Root size="sm" variant="subtle" colorPalette="teal">
        <Tag.Label>{p.condicion}</Tag.Label>
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
          colorPalette="red"
          onClick={() => handleEliminar(p)}
        >
          <FaTrash />
        </IconButton>
      </HStack>
    ),
  }));

  return (
    <Box p={4}>
      <Flex mb={4} align="center" justify="space-between" gap={4} wrap="wrap">
        <Heading as="h2" size="md">
          Proveedores
        </Heading>

        <HStack gap={2} wrap="wrap">
          <HStack gap={2}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proveedor, email, razón, CUIT…"
              size="sm"
              w={{ base: "full", md: "320px" }}
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

export default ProveedoresAdminPage;
