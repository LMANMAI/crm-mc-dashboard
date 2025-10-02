import React from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components"; // tu CustomTable

type EstadoRow = {
  id: number;
  nombre: string;
  colorHex: string;
  tipo: "Pendiente" | "En producción" | "Finalizado" | "Entregado" | "Error";
  inicial: boolean;
  inicialTienda: boolean;
  aplicaCtaCte: boolean;
};

const MOCK_ESTADOS: EstadoRow[] = [
  {
    id: 1,
    nombre: "1. Pendiente",
    colorHex: "#f1e601",
    tipo: "Pendiente",
    inicial: true,
    inicialTienda: true,
    aplicaCtaCte: true,
  },
  {
    id: 2,
    nombre: "2. Pendiente de Pago",
    colorHex: "#ffb300",
    tipo: "Pendiente",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 3,
    nombre: "3. En Proceso",
    colorHex: "#8ef107",
    tipo: "En producción",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 4,
    nombre: "4. Impresión",
    colorHex: "#2e8330",
    tipo: "En producción",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 5,
    nombre: "5. Terminaciones",
    colorHex: "#708577",
    tipo: "En producción",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 6,
    nombre: "6. Finalizado",
    colorHex: "#c0c0c0",
    tipo: "Finalizado",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 7,
    nombre: "7. Para Entregar",
    colorHex: "#13c2e1",
    tipo: "Finalizado",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 8,
    nombre: "8. Entregado",
    colorHex: "#7441fa",
    tipo: "Entregado",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
  {
    id: 9,
    nombre: "9. Error",
    colorHex: "#ff1111",
    tipo: "Error",
    inicial: false,
    inicialTienda: false,
    aplicaCtaCte: true,
  },
];

const EstadosAdminPage = () => {
  const [rows, setRows] = React.useState(MOCK_ESTADOS);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.nombre.toLowerCase().includes(q));
  }, [rows, search]);

  const handleNuevo = () => {
    console.log("Nuevo estado");
  };
  const handleEditar = (row: EstadoRow) => console.log("Editar", row);
  const handleEliminar = (row: EstadoRow) =>
    setRows((prev) => prev.filter((r) => r.id !== row.id));

  const data = filtered.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    color: (
      <HStack gap={2}>
        <Box
          w="16px"
          h="16px"
          rounded="sm"
          border="1px solid"
          borderColor="gray.300"
          style={{ backgroundColor: r.colorHex }}
        />
        <Badge variant="subtle">{r.colorHex}</Badge>
      </HStack>
    ),
    tipo: r.tipo,
    inicial: r.inicial ? "Sí" : "No",
    inicialTienda: r.inicialTienda ? "Sí" : "No",
    aplicaCtaCte: r.aplicaCtaCte ? "Sí" : "No",
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
    { header: "Color", accessor: "color" as const },
    { header: "Tipo", accessor: "tipo" as const },
    {
      header: "Inicial",
      accessor: "inicial" as const,
      textAlign: "center" as const,
    },
    {
      header: "Inicial tienda",
      accessor: "inicialTienda" as const,
      textAlign: "center" as const,
    },
    {
      header: "Aplica a Cta Cte",
      accessor: "aplicaCtaCte" as const,
      textAlign: "center" as const,
    },
    { header: "", accessor: "acciones" as const, textAlign: "center" as const },
  ];

  return (
    <Stack gap={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Estados
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
        {/* <Text fontWeight="semibold">Estados</Text> */}
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

      {/* Tabla */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        overflow="hidden"
      >
        <Table data={data} columns={columns} rowKey="id" size="sm" />
        {/* Paginación mock */}
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

export default EstadosAdminPage;
