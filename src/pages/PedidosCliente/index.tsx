import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  IconButton,
  Input,
  Tag,
  Menu,
  Portal,
} from "@chakra-ui/react";
import React from "react";
import { Select, Table, RowActions } from "../../components";
import { FaSearch, FaChevronDown, FaSlidersH } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";

type Column<T> = {
  header: string;
  accessor: keyof T;
  textAlign?: "left" | "right" | "center";
};

// Datos mock
const data = [
  {
    id: 1,
    nro: "#85093",
    fecha: "26/07/2025",
    cliente: "MarBet Gráfica Integral",
    titulo: "Bajada Laser B&N",
    producto: "Bajada Laser B&N",
    precio: "$ 6866.00",
    estado: (
      <Tag.Root size="sm" colorPalette={"yellow"}>
        <Tag.Label>1. Pendiente</Tag.Label>
      </Tag.Root>
    ),
    medioPago: "-",
    facturado: "$0",
    acciones: <RowActions rowId={1} />,
  },
  {
    id: 2,
    nro: "#85092",
    fecha: "25/07/2025",
    cliente: "RomaGraf",
    titulo: "Bajada Laser Color",
    producto: "Bajada Laser Color",
    precio: "$ 73695.00",
    estado: (
      <Tag.Root size="sm" colorPalette={"blue"}>
        <Tag.Label>7. Para Entregar</Tag.Label>
      </Tag.Root>
    ),
    medioPago: "-",
    facturado: "$0",
    acciones: <RowActions rowId={2} />,
  },
];

// Columnas
const columns: Column<(typeof data)[0]>[] = [
  { header: "Nro", accessor: "nro", textAlign: "right" },
  { header: "Fecha", accessor: "fecha", textAlign: "right" },
  { header: "Cliente", accessor: "cliente", textAlign: "right" },
  { header: "Título", accessor: "titulo", textAlign: "right" },
  { header: "Producto", accessor: "producto", textAlign: "right" },
  { header: "Precio", accessor: "precio", textAlign: "right" },
  { header: "Estado", accessor: "estado", textAlign: "left" },
  { header: "Medio de pago", accessor: "medioPago", textAlign: "center" },
  { header: "Facturado", accessor: "facturado", textAlign: "right" },
  { header: "", accessor: "acciones", textAlign: "center" },
];
const monthOptions = [
  { label: "Julio", value: "Julio" },
  { label: "Agosto", value: "Agosto" },
];

const yearOptions = [
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];
const OrdersAdminPage = () => {
  const [month, setMonth] = React.useState("Julio");
  const [year, setYear] = React.useState("2025");

  return (
    <Stack p={4} gap={6}>
      {/* Exportar */}
      {/* <Flex gap={4} align="center">
        <Select
          label="Mes"
          options={monthOptions}
          value={month}
          onChange={setMonth}
          multiple={false}
        />
        <Select
          label="Año"
          options={yearOptions}
          value={year}
          onChange={setYear}
          multiple={false}
        />
        <Button colorPalette={"teal"}>Exportar</Button>
      </Flex> */}

      {/* Encabezado y acciones */}
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="md" color="teal.600">
          Todos los pedidos
        </Text>
        <HStack gap={4}>
          <Button size="sm" colorPalette={"teal"}>
            <FaSlidersH /> Filtros
          </Button>
          {/* <Menu.Root>
            <Menu.Trigger asChild>
              <Button size="sm">
                <FaChevronDown /> Acciones masivas
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="entregado">Marcar como entregado</Menu.Item>
                  <Menu.Item value="eliminar">Eliminar</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Button size="sm" colorScheme="blue">
            Nuevo pedido
          </Button> */}
          <HStack>
            <Input placeholder="Buscar..." size="sm" />
            <IconButton aria-label="Search database" colorPalette={"teal"}>
              <LuSearch />
            </IconButton>
          </HStack>
        </HStack>
      </Flex>

      {/* Tabla */}
      <Box overflowX="auto">
        <Table data={data} columns={columns} rowKey="id" />
      </Box>
    </Stack>
  );
};

export default OrdersAdminPage;
