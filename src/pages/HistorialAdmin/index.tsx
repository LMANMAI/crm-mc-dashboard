import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Table } from "../../components";
import { LuSearch, LuHistory } from "react-icons/lu";

type Row = {
  id: number;
  tipo: string;
  accion: string;
  descripcion: string;
  fecha: string;
  usuario: string;
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

const RAW: Row[] = [
  {
    id: 1,
    tipo: "Pedido",
    accion: "Edición",
    descripcion:
      "Cambio en el pedido 85944. 1. Pendiente por 7. Para Entregar , precio 1695.00 por 1695",
    fecha: "19/08/2025 16:23:32",
    usuario: "Usuario: Andrea",
  },
  {
    id: 2,
    tipo: "Pedido",
    accion: "Edición",
    descripcion: "Cambio en el pedido 85944. Hora de entrega por 0:00",
    fecha: "19/08/2025 16:22:38",
    usuario: "Usuario: Andrea",
  },
  {
    id: 3,
    tipo: "Pedido",
    accion: "Edición",
    descripcion:
      "Cambio en el pedido 85928. 4. Impresión por 7. Para Entregar , precio 55283.00 por 55283",
    fecha: "19/08/2025 16:14:45",
    usuario: "Usuario: Fer",
  },
];

const HistorialAdminPage: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [page] = React.useState(1); // mock

  const filtered = RAW.filter(
    (r) =>
      r.tipo.toLowerCase().includes(search.toLowerCase()) ||
      r.accion.toLowerCase().includes(search.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      r.usuario.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Tipo", accessor: "tipo" },
    { header: "Acción", accessor: "accion" },
    { header: "Descripción", accessor: "descripcion" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Usuario", accessor: "usuario" },
  ];

  return (
    <Stack px={4} py={6} maxW="1400px" mx="auto" gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        Historial
      </Text>

      <Card>
        {/* <SectionHeader>Historial</SectionHeader> */}
        <Flex p={3} justify="flex-end" gap={3} wrap="wrap">
          <HStack>
            <Input
              size="sm"
              placeholder="Buscar…"
              w={{ base: "200px", md: "320px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton size="sm" aria-label="buscar">
              <LuSearch />
            </IconButton>
          </HStack>
        </Flex>

        {/* tabla */}
        <Box px={3} pb={3} overflowX="auto">
          <Table<Row>
            data={filtered}
            columns={columns}
            rowKey="id"
            // onRowClick={(r) => console.log(r)}
          />
        </Box>

        <Flex
          px={3}
          py={2}
          bg="gray.50"
          borderTopWidth="1px"
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap={3}
        >
          <Text fontSize="sm" color="gray.600">
            Hay {filtered.length} resultados en 46575 páginas
          </Text>
          <HStack>
            {["<<", "1", "2", "3", "4", "5", "6", ">>"].map((p) => (
              <Button
                key={p}
                size="xs"
                variant={p === String(page) ? "solid" : "outline"}
              >
                {p}
              </Button>
            ))}
          </HStack>
        </Flex>
      </Card>
    </Stack>
  );
};

export default HistorialAdminPage;
