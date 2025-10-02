import React from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components";
type CategoriaRow = {
  id: number;
  nombre: string;
  descripcion: string;
  padre: string;
};

const MOCK_CATEGORIAS: CategoriaRow[] = [
  {
    id: 1,
    nombre: "Anillados",
    descripcion: "Anillados plásticos o metálicos (ringwire)…",
    padre: "IMPRENTA",
  },
  {
    id: 2,
    nombre: "Anotadores y Agendas",
    descripcion: "Anotadores y agendas personalizadas, anilladas…",
    padre: "IMPRENTA",
  },
  {
    id: 3,
    nombre: "Bajadas Láser",
    descripcion: "Impresiones sueltas en diferentes tamaños…",
    padre: "IMPRENTA",
  },
  {
    id: 4,
    nombre: "Carpetas",
    descripcion: "Carpetas de diferentes tamaños y características…",
    padre: "IMPRENTA",
  },
  {
    id: 5,
    nombre: "Catálogos",
    descripcion: "Catálogos para productos con diferentes…",
    padre: "IMPRENTA",
  },
  {
    id: 6,
    nombre: "Comprobantes AFIP",
    descripcion: "Talonarios de comprobantes reglamentados…",
    padre: "IMPRENTA",
  },
];

const CategoriasAdminPage = () => {
  const [rows, setRows] = React.useState<CategoriaRow[]>(MOCK_CATEGORIAS);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q) ||
        r.padre.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const handleNuevo = () => {
    console.log("Nueva categoría");
  };

  const handleEditar = (row: CategoriaRow) => {
    console.log("Editar", row);
  };

  const handleEliminar = (row: CategoriaRow) => {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const data = filtered.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: (
      <Text
        title={r.descripcion}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {r.descripcion}
      </Text>
    ),

    padre: r.padre,
    acciones: (
      <HStack justify="flex-end" gap={2}>
        <IconButton
          aria-label="Editar"
          size="xs"
          variant="subtle"
          onClick={() => handleEditar(r)}
        >
          <FaEdit />
        </IconButton>
        <IconButton
          aria-label="Eliminar"
          size="xs"
          variant="subtle"
          colorPalette="red"
          onClick={() => handleEliminar(r)}
        >
          <FaTrash />
        </IconButton>
      </HStack>
    ),
  }));

  const columns = [
    { header: "Nombre", accessor: "nombre" as const },
    { header: "Descripción", accessor: "descripcion" as const },
    { header: "Categoría Padre", accessor: "padre" as const },
    { header: "", accessor: "acciones" as const, textAlign: "center" as const },
  ];

  return (
    <Stack gap={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Categorías
      </Text>

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
        <Text fontWeight="semibold">Categorías</Text>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar…"
              size="sm"
              border="none"
              _focusVisible={{ boxShadow: "none" }}
              minW={{ base: "160px", md: "260px" }}
              color="black"
            />
            <IconButton aria-label="Buscar" size="xs" variant="ghost">
              <FaSearch />
            </IconButton>
          </HStack>

          <Button
            size="sm"
            bg="teal.600"
            _hover={{ bg: "teal.700" }}
            onClick={handleNuevo}
          >
            <FaPlus /> Nuevo
          </Button>
        </HStack>
      </Box>

      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        overflow="hidden"
      >
        <Table data={data} columns={columns} rowKey="id" size="sm" />
        <Box bg="gray.200" px={4} py={3}>
          <HStack gap={2}>
            <Button size="xs" variant="subtle">
              «
            </Button>
            <Button size="xs" variant="solid" colorPalette="teal">
              1
            </Button>
            <Button size="xs" variant="subtle">
              2
            </Button>
            <Button size="xs" variant="subtle">
              3
            </Button>
            <Button size="xs" variant="subtle">
              »
            </Button>
          </HStack>
        </Box>
      </Box>
    </Stack>
  );
};

export default CategoriasAdminPage;
