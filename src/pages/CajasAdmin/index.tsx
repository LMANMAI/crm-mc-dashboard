import React from 'react';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaPlus,
  FaList,
  FaTimes,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { Table } from '../../components'; // <- tu CustomTable

type Caja = {
  id: number;
  nombre: string;
  usuarios: string;
  estado: string;
  abierta: boolean;
};

const initialRows: Caja[] = [
  {
    id: 1,
    nombre: 'Santa Fe',
    usuarios: '13 usuarios',
    estado: 'Abierta el 09-08-2020 a las 19:19',
    abierta: true,
  },
  {
    id: 2,
    nombre: 'Vacía',
    usuarios: 'Sin usuarios',
    estado: 'Cerrada el 27-01-2020 a las 15:23',
    abierta: false,
  },
];

const CajasAdminPage = () => {
  const [rows, setRows] = React.useState<Caja[]>(initialRows);
  const [search, setSearch] = React.useState('');

  const handleNuevo = () => {
    // TODO: abrir modal o navegar a formulario de creación
    console.log('Nueva caja');
  };

  const handleVerUsuarios = (row: Caja) => {
    console.log('Ver usuarios de caja:', row);
  };

  const handleAbrirCerrar = (row: Caja) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              abierta: !r.abierta,
              estado: !r.abierta
                ? `Abierta el ${new Date().toLocaleDateString()} a las ${new Date()
                    .toLocaleTimeString()
                    .slice(0, 5)}`
                : `Cerrada el ${new Date().toLocaleDateString()} a las ${new Date()
                    .toLocaleTimeString()
                    .slice(0, 5)}`,
            }
          : r,
      ),
    );
  };

  const handleEditar = (row: Caja) => {
    console.log('Editar caja:', row);
  };

  const handleEliminar = (row: Caja) => {
    // TODO: confirmación
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  // Filtro por búsqueda
  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.nombre.toLowerCase().includes(q));
  }, [rows, search]);

  // Construyo los datos que consume tu <Table> (acciones como ReactNode)
  const dataForTable = React.useMemo(
    () =>
      filtered.map((row) => ({
        id: row.id,
        nombre: row.nombre,
        usuarios: row.usuarios,
        estado: row.estado,
        acciones: (
          <HStack justify="flex-end" gap={2}>
            <IconButton
              aria-label="Ver usuarios"
              size="xs"
              variant="subtle"
              onClick={() => handleVerUsuarios(row)}
              title="Ver usuarios"
            >
              <FaList />
            </IconButton>
            <IconButton
              aria-label={row.abierta ? 'Cerrar' : 'Abrir'}
              size="xs"
              variant="subtle"
              colorPalette={row.abierta ? 'yellow' : 'green'}
              onClick={() => handleAbrirCerrar(row)}
              title={row.abierta ? 'Cerrar caja' : 'Abrir caja'}
            >
              <FaTimes />
            </IconButton>
            <IconButton
              aria-label="Editar"
              size="xs"
              variant="subtle"
              onClick={() => handleEditar(row)}
              title="Editar"
            >
              <FaEdit />
            </IconButton>
            <IconButton
              aria-label="Eliminar"
              size="xs"
              variant="subtle"
              colorPalette="red"
              onClick={() => handleEliminar(row)}
              title="Eliminar"
            >
              <FaTrash />
            </IconButton>
          </HStack>
        ),
      })),
    [filtered],
  );

  const columns = [
    { header: 'Nombre', accessor: 'nombre' as const },
    { header: 'Usuarios', accessor: 'usuarios' as const },
    { header: 'Estado', accessor: 'estado' as const },
    {
      header: 'Acciones',
      accessor: 'acciones' as const,
      textAlign: 'center' as const,
    },
  ];

  return (
    <Stack gap={4}>
      {/* Encabezado */}
      <HStack>
        <Text fontSize="2xl" fontWeight="bold">
          Cajas
        </Text>
      </HStack>

      {/* Barra superior de acciones */}
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
        <Text fontWeight="semibold">Cajas</Text>

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
            onClick={handleNuevo}
          >
            <FaPlus /> Nuevo
          </Button>
        </HStack>
      </Box>

      {/* Tabla (tu componente) */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        overflow="hidden"
      >
        <Table data={dataForTable} columns={columns} rowKey="id" size="sm" />
        {/* Footer de paginación (mock) */}
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

export default CajasAdminPage;
