import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  Tooltip,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Select, Table } from "../../components";
import { LuDownload, LuSearch, LuPlus } from "react-icons/lu";

const monthOptions = [
  { label: "Agosto", value: "08" },
  { label: "Julio", value: "07" },
  { label: "Junio", value: "06" },
];

const yearOptions = [
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];

const estados = {
  pendiente: (
    <Tag.Root size="sm" colorPalette="yellow">
      <Tag.Label>1. Pendiente</Tag.Label>
    </Tag.Root>
  ),
  paraEntregar: (
    <Tag.Root size="sm" colorPalette="blue">
      <Tag.Label>7. Para Entregar</Tag.Label>
    </Tag.Root>
  ),
  terminaciones: (
    <Tag.Root size="sm" colorPalette="gray">
      <Tag.Label>5. Terminaciones</Tag.Label>
    </Tag.Root>
  ),
};

const rows = [
  {
    id: 1,
    nro: "85041",
    fecha: "19/08/2025",
    cliente: "octavio felic",
    titulo: "Sticker Troquelado",
    producto: "Bajada Laser B&N",
    color: "MyF",
    medida: "21x29.7",
    cant: "1.00",
    precio: "$ 1.980,00",
    estado: estados.paraEntregar,
    medioPago: "-",
    facturado: "$0",
  },
  {
    id: 2,
    nro: "85039",
    fecha: "19/08/2025",
    cliente: "Morph (f)",
    titulo: "Talonarios duplicado",
    producto: "Bajada Laser Color",
    color: "Full color frente",
    medida: "29x40",
    cant: "2.00",
    precio: "$ 6.990,00",
    estado: estados.terminaciones,
    medioPago: "-",
    facturado: "$0",
  },
];

const columns = [
  { header: "Sel.", accessor: "sel" },
  { header: "Nro", accessor: "nro" },
  { header: "Fecha", accessor: "fecha" },
  { header: "Cliente", accessor: "cliente" },
  { header: "Título", accessor: "titulo" },
  { header: "Producto", accessor: "producto" },
  { header: "Color", accessor: "color" },
  { header: "Medida", accessor: "medida" },
  { header: "Cant.", accessor: "cant", textAlign: "right" as const },
  { header: "Precio", accessor: "precio", textAlign: "right" as const },
  { header: "Estado", accessor: "estado", textAlign: "center" as const },
  {
    header: "Medio de pago",
    accessor: "medioPago",
    textAlign: "center" as const,
  },
  { header: "Facturado", accessor: "facturado", textAlign: "right" as const },
  { header: "", accessor: "acciones", textAlign: "center" as const },
];

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <Box
    bg="teal.500"
    color="white"
    fontWeight="semibold"
    fontSize="sm"
    px="3"
    py="2"
    rounded="md"
  >
    {children}
  </Box>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

const PedidosAdminPage = () => {
  const [month, setMonth] = React.useState("08");
  const [year, setYear] = React.useState("2025");
  const [search, setSearch] = React.useState("");

  const tableData = rows.map((r) => ({
    ...r,
    sel: <input type="checkbox" />,
    acciones: (
      <Menu.Root positioning={{ placement: "bottom-end" }}>
        <Menu.Trigger asChild>
          <Button size="xs" colorPalette="blue">
            Acciones
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="preview">Previsualizar</Menu.Item>
              <Menu.Item value="print">Imprimir</Menu.Item>
              <Menu.Item value="reprint">Reimprimir</Menu.Item>
              <Menu.Item value="delete-order">Eliminar orden</Menu.Item>
              <Menu.Item value="delete-file">Eliminar archivo</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="mark-important">
                Marcar como importante
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    ),
  }));

  return (
    <Stack px={4} py={6} maxW="1400px" mx="auto" gap={6}>
      {/* Exportar */}
      <Card>
        <SectionHeader>Exportar</SectionHeader>
        <Flex gap={3} p={3} align="center" wrap="wrap">
          <Select
            options={monthOptions}
            value={month}
            onChange={setMonth}
            multiple={false}
          />
          <Select
            options={yearOptions}
            value={year}
            onChange={setYear}
            multiple={false}
          />
          <Button
            //leftIcon={<LuDownload />}
            size="sm"
            colorPalette="green"
          >
            Exportar
          </Button>
        </Flex>
      </Card>

      {/* Filtros */}
      <Card>
        <SectionHeader>Filtros</SectionHeader>
        <Stack p={3} gap={3}>
          <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={3}>
            <Input placeholder="Número" size="sm" />
            <Select
              options={[
                { label: "Seleccione un cliente", value: "" },
                { label: "Morph (f)", value: "morph" },
                { label: "Octavio Felic", value: "octavio" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
            <Select
              options={[
                { label: "Seleccione una terminación", value: "" },
                { label: "Anillado", value: "anillado" },
                { label: "Laminado", value: "laminado" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
          </Grid>

          <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={3}>
            <Input placeholder="Estado" size="sm" />
            <Select
              options={[
                { label: "Seleccione un producto", value: "" },
                { label: "Bajada Laser B&N", value: "bn" },
                { label: "Bajada Laser Color", value: "color" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
            <Select
              options={[
                { label: "Seleccione un sector", value: "" },
                { label: "Impresión", value: "impresion" },
                { label: "Terminaciones", value: "terminaciones" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
          </Grid>

          <Grid
            templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr 1fr" }}
            gap={3}
          >
            <Select
              options={[
                { label: "Filtrar por papel", value: "" },
                { label: "Ilustración 170g", value: "il170" },
                { label: "Obra 80g", value: "obra80" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
            <Select
              options={[
                { label: "Seleccione un usuario", value: "" },
                { label: "Carlos", value: "carlos" },
                { label: "Lucía", value: "lucia" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
            <Input type="date" size="sm" />
            <Input type="date" size="sm" />
          </Grid>

          <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={3}>
            <Select
              options={[
                { label: "Seleccione un color", value: "" },
                { label: "B&N", value: "bn" },
                { label: "Full Color", value: "cmky" },
              ]}
              value={""}
              onChange={() => {}}
              multiple={false}
            />
            <Input placeholder="Cantidad" size="sm" />
            <HStack justify="flex-end" gap={3}>
              <Button size="sm" colorPalette="blue">
                Aplicar
              </Button>
              <Button
                size="sm"
                //leftIcon={<LuDownload />}
              >
                Exportar filtrados
              </Button>
            </HStack>
          </Grid>
        </Stack>
      </Card>

      {/* Tabla */}
      <Card>
        <SectionHeader>Todos los pedidos</SectionHeader>
        <Flex p={3} justify="space-between" gap={3} wrap="wrap">
          <HStack gap={2}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button size="sm" variant="subtle">
                  Acciones masivas
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="mark-delivered">
                      Marcar como entregado
                    </Menu.Item>
                    <Menu.Item value="delete">Eliminar seleccionados</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Button
              size="sm"
              //leftIcon={<LuPlus />}
              colorPalette="blue"
            >
              Nuevo pedido
            </Button>
          </HStack>

          <HStack>
            <Input
              size="sm"
              placeholder="Buscar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={{ base: "200px", md: "260px" }}
            />
            {/* <Tooltip content="Buscar">
              <IconButton aria-label="Buscar" size="sm">
                <LuSearch />
              </IconButton>
            </Tooltip> */}
          </HStack>
        </Flex>

        {/* Tabla */}
        <Box px={3} pb={3} overflowX="auto">
          <Table data={tableData} columns={columns} rowKey="id" />
        </Box>

        <Flex px={3} pb={3} gap={1}>
          {["<<", "<", "1", "2", "3", ">", ">>"].map((p) => (
            <Button key={p} size="xs" variant={p === "1" ? "solid" : "outline"}>
              {p}
            </Button>
          ))}
        </Flex>
      </Card>
    </Stack>
  );
};

export default PedidosAdminPage;
