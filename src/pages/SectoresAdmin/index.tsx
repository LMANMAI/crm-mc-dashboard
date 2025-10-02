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

type SectorRow = {
  id: number;
  nombre: string;
  descripcion: string;
};

const MOCK_SECTORES: SectorRow[] = [
  { id: 1, nombre: "Administración", descripcion: "Administración" },
  { id: 2, nombre: "Diseño", descripcion: "Diseño" },
  { id: 3, nombre: "Producción", descripcion: "Producción" },
  { id: 4, nombre: "Terminaciones", descripcion: "Terminaciones" },
  { id: 5, nombre: "Uriburu", descripcion: "Uriburu" },
  { id: 6, nombre: "Venta", descripcion: "Venta" },
];

const SectoresAdminPage = () => {
  const [rows, setRows] = React.useState<SectorRow[]>(MOCK_SECTORES);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const handleNuevo = () => {
    console.log("Nuevo sector");
  };

  const handleEditar = (row: SectorRow) => {
    console.log("Editar", row);
  };

  const handleEliminar = (row: SectorRow) => {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const data = filtered.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion,
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
    { header: "", accessor: "acciones" as const, textAlign: "center" as const },
  ];

  return (
    <Stack gap={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Sectores
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
        <Text fontWeight="semibold">Sectores</Text>
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
              placeholder="Buscar..."
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
              »
            </Button>
          </HStack>
        </Box>
      </Box>
    </Stack>
  );
};

export default SectoresAdminPage;
