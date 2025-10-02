import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Tag,
  Tooltip,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Table } from "../../components";
import {
  LuMessageSquare,
  LuSearch,
  LuPrinter,
  LuTrash2,
  LuMessagesSquare,
} from "react-icons/lu";

type ProyectoRow = {
  id: number;
  nro: string;
  ordenes: React.ReactNode;
  cliente: string;
  empresa: string;
  sector: string;
  descripcion: string;
  acciones: React.ReactNode;
};

// helpers
const OrdenChip = ({ n, tone = "cyan" as any }: any) => (
  <Tag.Root size="sm" colorPalette={tone} mr="1">
    <Tag.Label>{n}</Tag.Label>
  </Tag.Root>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <Box
    bg="teal.500"
    color="white"
    fontWeight="semibold"
    fontSize="sm"
    px="3"
    py="2"
    roundedTop="md"
  >
    {children}
  </Box>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

// mock
const rawRows = [
  {
    id: 35201,
    nro: "35201",
    ordenes: [8944],
    cliente: "octavio felice",
    empresa: "-",
    sector: "-",
    descripcion: "-",
  },
  {
    id: 35200,
    nro: "35200",
    ordenes: [8942],
    cliente: "Grafica 312",
    empresa: "Grafica 312 (g)",
    sector: "-",
    descripcion: "-",
  },
  {
    id: 35199,
    nro: "35199",
    ordenes: [8939, 8940, 8941],
    cliente: "octavio felice",
    empresa: "-",
    sector: "-",
    descripcion: "-",
  },
];

const ProyectosAdminPage: React.FC = () => {
  const [search, setSearch] = React.useState("");

  const rows: ProyectoRow[] = rawRows.map((r, idx) => ({
    id: r.id,
    nro: r.nro,
    ordenes: (
      <HStack wrap="wrap">
        {r.ordenes.map((n, i) => (
          <OrdenChip
            key={n}
            n={n}
            tone={i % 3 === 0 ? "yellow" : i % 3 === 1 ? "cyan" : "teal"}
          />
        ))}
      </HStack>
    ),
    cliente: r.cliente,
    empresa: r.empresa,
    sector: r.sector,
    descripcion: r.descripcion,
    acciones: (
      <HStack justify="center">
        {/* <Tooltip content="Mensaje"> */}
        <IconButton size="xs" aria-label="mensaje">
          <LuMessagesSquare />
        </IconButton>
        {/*  </Tooltip>*/}
        {/* <Tooltip content="Imprimir">*/}
        <IconButton size="xs" aria-label="imprimir">
          <LuPrinter />
        </IconButton>
        {/*  </Tooltip>*/}
        {/* <Tooltip content="Eliminar">*/}
        <IconButton size="xs" aria-label="eliminar">
          <LuTrash2 />
        </IconButton>
        {/*   </Tooltip>*/}
      </HStack>
    ),
  }));

  const columns = [
    { header: "Nro", accessor: "nro" },
    { header: "Ordenes", accessor: "ordenes" },
    { header: "Clientes", accessor: "cliente" },
    { header: "Empresa", accessor: "empresa" },
    { header: "Sector", accessor: "sector" },
    { header: "Descripcion", accessor: "descripcion" },
    { header: "", accessor: "acciones", textAlign: "center" as const },
  ];

  return (
    <Stack px={4} py={6} maxW="1400px" mx="auto" gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        Módulo de administración de proyectos
      </Text>

      <Card>
        <SectionHeader>Todos los proyectos</SectionHeader>

        <Flex p={3} justify="flex-end" gap={3} wrap="wrap">
          <Button
            size="sm"
            //leftIcon={<LuMessageSquare />}
          >
            Mensaje
          </Button>
          <HStack>
            <Input
              size="sm"
              placeholder="Buscar…"
              w={{ base: "200px", md: "280px" }}
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
          <Table data={rows} columns={columns} rowKey="id" />
        </Box>

        <Flex px={3} pb={4} gap={1}>
          {["«", "1", "2", "3", "4", "5", "6", "»"].map((p) => (
            <Button key={p} size="xs" variant={p === "1" ? "solid" : "outline"}>
              {p}
            </Button>
          ))}
        </Flex>
      </Card>
    </Stack>
  );
};

export default ProyectosAdminPage;
