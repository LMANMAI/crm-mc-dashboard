// src/pages/ClientesAdmin/index.tsx
import React from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Input,
  InputGroup,
  Button,
  RadioGroup,
  // Radio,
  Text,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { FaSearch, FaPlus, FaFileExport, FaEdit, FaEye } from "react-icons/fa";
import { Table, type Column } from "../../components/Table";

type Cliente = {
  id: number;
  nombre: string;
  usuario: string;
  empresa: string;
  rubro: string;
  email: string;
  cuit: string;
  telefono: string;
  celular: string;
  direccion: string;
  saldo: number;
};

const mock: Cliente[] = [
  {
    id: 1,
    nombre: "Fundación San Martín de Tours",
    usuario: "De Rentas",
    empresa: "",
    rubro: "-",
    email: "contacto@fsmt.org",
    cuit: "30-51695918-1",
    telefono: "",
    celular: "",
    direccion: "",
    saldo: 0,
  },
  {
    id: 2,
    nombre: "Auringer S.A.",
    usuario: "Auringer S.A.",
    empresa: "Auringer S.A.",
    rubro: "Industria",
    email: "ventas@auringer.com",
    cuit: "30-78181788-1",
    telefono: "11-4000-0000",
    celular: "11-5555-5555",
    direccion: "Av. Siempre Viva 742",
    saldo: 0,
  },
  {
    id: 3,
    nombre: "Conzimo SRL",
    usuario: "Conzimo",
    empresa: "Conzimo SRL",
    rubro: "Servicios",
    email: "info@conzimo.com",
    cuit: "27-33835301-2",
    telefono: "",
    celular: "11-2222-3333",
    direccion: "Uruguay 806 Piso 7 Dpto 21",
    saldo: -5712,
  },
];

const ClientesAdminPage = () => {
  const [tienePedido, setTienePedido] = React.useState<"no" | "si" | "todos">(
    "todos"
  );

  const rows = mock.map((c) => ({
    ...c,
    saldoFmt: (
      <Badge
        variant="subtle"
        colorPalette={c.saldo < 0 ? "red" : "teal"}
        px="2"
      >
        {c.saldo < 0
          ? `-$ ${Math.abs(c.saldo).toLocaleString()}`
          : `$ ${c.saldo.toLocaleString()}`}
      </Badge>
    ),
    acciones: (
      <HStack gap="2" justify="flex-end">
        <IconButton aria-label="Ver" size="xs">
          <FaEye />
        </IconButton>
        <IconButton aria-label="Editar" size="xs" colorPalette="teal">
          <FaEdit />
        </IconButton>
      </HStack>
    ),
  }));

  const columns: Column<(typeof rows)[number]>[] = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Usuario", accessor: "usuario" },
    { header: "Empresa", accessor: "empresa" },
    { header: "Rubro", accessor: "rubro" },
    { header: "Email", accessor: "email" },
    { header: "CUIT", accessor: "cuit" },
    { header: "Teléfonos", accessor: "telefono" },
    { header: "Celular", accessor: "celular" },
    { header: "Dirección", accessor: "direccion" },
    { header: "Saldo", accessor: "saldoFmt", textAlign: "left" },
    { header: "", accessor: "acciones", textAlign: "right" },
  ];

  return (
    <Box px={6} py={6}>
      {/* Header */}
      <HStack mb={4} justify="space-between">
        <Heading size="lg">Módulo de clientes</Heading>
        <HStack gap="3">
          <InputGroup endElement={<FaSearch />} maxW="320px">
            <Input size="sm" placeholder="Buscar..." />
          </InputGroup>
          <Button size="sm" colorPalette="teal">
            <FaSearch /> Buscar
          </Button>
          <Button size="sm" colorPalette="teal">
            <FaPlus /> Nuevo
          </Button>
          <Button size="sm" colorPalette="teal">
            <FaFileExport /> Exportar
          </Button>
        </HStack>
      </HStack>

      {/* Filtro */}
      <Box borderWidth="1px" rounded="md" overflow="hidden" mb={4}>
        <Box bg="teal.500" color="white" px="4" py="2" fontWeight="bold">
          Filtro
        </Box>
        <Box p="4">
          <Stack gap="3">
            <Text fontWeight="medium">Tiene pedido</Text>

            <RadioGroup.Root
              value={tienePedido}
              onValueChange={(details) =>
                setTienePedido(details.value as "no" | "si" | "todos")
              }
            >
              <HStack gap="6">
                <RadioGroup.Item value="no">
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>No</RadioGroup.ItemText>
                </RadioGroup.Item>

                <RadioGroup.Item value="si">
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Sí</RadioGroup.ItemText>
                </RadioGroup.Item>

                <RadioGroup.Item value="todos">
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Todos</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>

            <HStack>
              <Button size="sm" colorPalette="teal">
                Aplicar
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Box>

      <Box borderWidth="1px" rounded="md" overflow="hidden">
        <Box bg="teal.500" color="white" px="4" py="2" fontWeight="bold">
          Clientes
        </Box>
        <Box p="4">
          <Table data={rows} columns={columns} rowKey="id" />

          {/* Paginación placeholder */}
          <HStack justify="center" gap="2" mt="4">
            <Button size="xs" variant="outline">
              &laquo;
            </Button>
            <Button size="xs" variant="outline">
              &lt;
            </Button>
            <Button size="xs" colorPalette="teal">
              1
            </Button>
            <Button size="xs" variant="outline">
              &gt;
            </Button>
            <Button size="xs" variant="outline">
              &raquo;
            </Button>
          </HStack>

          <Text mt="3" fontSize="xs" color="gray.500">
            Hay {rows.length} resultado{rows.length !== 1 ? "s" : ""} en 1
            página
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientesAdminPage;
