import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Field,
  Fieldset,
  Grid,
  HStack,
  IconButton,
  Input,
  Stack,
  Textarea,
  Text,
  Badge,
  Table,
} from "@chakra-ui/react";
import { LuPlus, LuSave, LuTrash2, LuFilePen } from "react-icons/lu";

const Panel = ({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
    <HStack
      px="3"
      py="2"
      justify="space-between"
      bg="teal.500"
      color="white"
      fontWeight="semibold"
      fontSize="sm"
    >
      <Text>{title}</Text>
      <HStack>{right}</HStack>
    </HStack>
    <Box p="3">{children}</Box>
  </Box>
);

const SimpleTable = ({
  cols,
  rows,
}: {
  cols: string[];
  rows: React.ReactNode[][];
}) => (
  <Table.Root size="sm" variant="line">
    <Table.Header>
      <Table.Row bg="gray.50">
        {cols.map((c) => (
          <Table.ColumnHeader key={c}>{c}</Table.ColumnHeader>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.length === 0 ? (
        <Table.Row>
          <Table.Cell
            colSpan={cols.length}
            textAlign="center"
            py="8"
            color="gray.500"
          >
            No hay resultados
          </Table.Cell>
        </Table.Row>
      ) : (
        rows.map((r, i) => (
          <Table.Row key={i}>
            {r.map((cell, j) => (
              <Table.Cell key={j}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))
      )}
    </Table.Body>
  </Table.Root>
);

const valoresClick = [
  ["Blanco & Negro A4", "$ 12,50"],
  ["Blanco & Negro A3", "$ 21,90"],
  ["Color A4", "$ 39,50"],
  ["Color A3", "$ 81,00"],
];

const productos = [
  {
    nombre: "Anillados",
    desc: "Ideal para apuntes, catálogos y blocks. Elegí tipo de anillo y cantidad de hojas, depende del gramaje. Incluye tapas plásticas. Recomendado para papeles A4 80g.",
    pliegos: (
      <Text fontSize="xs" color="gray.600">
        1 a 50 / 51 a 100 / 101 a 200…
      </Text>
    ),
  },
  {
    nombre: "Bajada Láser B&N",
    desc: "Servicio de láser B&N alta calidad. Incluye imposición y optimización de pliegos.",
    pliegos: <Badge colorPalette="teal">Auto-calculado</Badge>,
  },
];

const papeles = [
  ["Acuarelado Brillo c/ opal", "0.13"],
  ["Ilustración Mate 170g", "0.20"],
  ["Cartulina Blanca 250g", "0.45"],
];

const tamanios = [
  ["A5", "14.8", "21.0"],
  ["A4", "21.0", "29.7"],
  ["A3", "29.7", "42.0"],
];

const cargosPliegos = [["Menor a 9 pliegos", "8.0", "5%"]];

const terminaciones = [
  ["1 línea de troquel corta", "3.0"],
  ["2 líneas 0.60", "6.0"],
  ["3 trazados", "9.0"],
];

const colores = [
  ["Blanco & Negro frente (B/N)", "10%"],
  ["Full color frente", "20%"],
  ["Full color frente y dorso", "35%"],
];

const CotizadorAdminPage = () => {
  return (
    <Box px={4} py={6} maxW="1200px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Módulo de cotizaciones
      </Text>

      <Panel
        title="Configuraciones generales"
        right={
          <Button
            //leftIcon={<LuSave />}
            size="xs"
            colorPalette="teal"
            variant="solid"
          >
            Guardar
          </Button>
        }
      >
        <Stack gap={4}>
          <Fieldset.Root columns={{ base: 1, md: 4 }} gap={3}>
            <Field.Root>
              <Field.Label>Cotización color (12x9)</Field.Label>
              <Input size="sm" placeholder="1240" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Ganancia por impresión</Field.Label>
              <Input size="sm" placeholder="10%" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Cantidad mínima de pliegos</Field.Label>
              <Input size="sm" placeholder="1" />
            </Field.Root>
            <Field.Root>
              <Field.Label> </Field.Label>
              {/* <Checkbox mt="2">No mostrar decimales</Checkbox> */}
            </Field.Root>
          </Fieldset.Root>

          <Field.Root>
            <Field.Label>Mensaje de la compra</Field.Label>
            <Textarea
              rows={8}
              placeholder="¡Gracias por tu compra! Podés abonar por Mercado Pago…"
              size="sm"
            />
          </Field.Root>
        </Stack>
      </Panel>

      <Stack mt={4} gap={4}>
        {/* Valores por click */}
        <Panel
          title="Valores por click"
          right={
            <Button
              size="xs"
              colorPalette="teal"
              //leftIcon={<LuPlus />}
            >
              Nuevo
            </Button>
          }
        >
          <SimpleTable
            cols={["Nombre", "Costo", "Acciones"]}
            rows={valoresClick.map(([n, c]) => [
              n,
              c,
              <HStack key={n} justify="end">
                <IconButton aria-label="edit" size="xs" colorPalette="teal">
                  <LuFilePen />
                </IconButton>
                <IconButton aria-label="delete" size="xs" colorPalette="pink">
                  <LuTrash2 />
                </IconButton>
              </HStack>,
            ])}
          />
        </Panel>

        <Panel
          title="Productos"
          right={
            <Button
              size="xs"
              colorPalette="teal"
              // leftIcon={<LuPlus />}
            >
              Nuevo producto…
            </Button>
          }
        >
          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader>Descripción</Table.ColumnHeader>
                <Table.ColumnHeader>Pliegos</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Acciones
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {productos.map((p) => (
                <Table.Row key={p.nombre} verticalAlign="top">
                  <Table.Cell minW="180px" fontWeight="medium">
                    {p.nombre}
                  </Table.Cell>
                  <Table.Cell>{p.desc}</Table.Cell>
                  <Table.Cell minW="180px">{p.pliegos}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack justify="end">
                      <IconButton
                        aria-label="edit"
                        size="xs"
                        colorPalette="teal"
                      >
                        <LuFilePen />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="xs"
                        colorPalette="pink"
                      >
                        <LuTrash2 />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Panel>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <Panel
            title="Tipos de papeles"
            right={
              <Button
                size="xs"
                //  leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable
              cols={["Nombre", "Gruesor", "Acciones"]}
              rows={papeles.map(([n, g]) => [
                n,
                g,
                <HStack key={n} justify="end">
                  <IconButton aria-label="edit" size="xs" colorPalette="teal">
                    <LuFilePen />
                  </IconButton>
                  <IconButton aria-label="delete" size="xs" colorPalette="pink">
                    <LuTrash2 />
                  </IconButton>
                </HStack>,
              ])}
            />
          </Panel>

          <Panel
            title="Tamaños ppinkefinidos"
            right={
              <Button
                size="xs"
                //leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable
              cols={["Nombre", "Ancho", "Alto", "Acciones"]}
              rows={tamanios.map(([n, a, h]) => [
                n,
                a,
                h,
                <HStack key={n} justify="end">
                  <IconButton aria-label="edit" size="xs" colorPalette="teal">
                    <LuFilePen />
                  </IconButton>
                  <IconButton aria-label="delete" size="xs" colorPalette="pink">
                    <LuTrash2 />
                  </IconButton>
                </HStack>,
              ])}
            />
          </Panel>

          <Panel
            title="Cargos por pliegos"
            right={
              <Button
                size="xs"
                // leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable
              cols={["Desde", "Cargo mín.", "Porcentaje", "Acciones"]}
              rows={cargosPliegos.map(([d, c, p]) => [
                d,
                c,
                p,
                <HStack key={d} justify="end">
                  <IconButton aria-label="edit" size="xs" colorPalette="teal">
                    <LuFilePen />
                  </IconButton>
                  <IconButton aria-label="delete" size="xs" colorPalette="pink">
                    <LuTrash2 />
                  </IconButton>
                </HStack>,
              ])}
            />
          </Panel>

          <Panel
            title="Terminaciones"
            right={
              <Button
                size="xs"
                //  leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable
              cols={["Nombre", "Cargo mínimo", "Acciones"]}
              rows={terminaciones.map(([n, c]) => [
                n,
                c,
                <HStack key={n} justify="end">
                  <IconButton aria-label="edit" size="xs" colorPalette="teal">
                    <LuFilePen />
                  </IconButton>
                  <IconButton aria-label="delete" size="xs" colorPalette="pink">
                    <LuTrash2 />
                  </IconButton>
                </HStack>,
              ])}
            />
          </Panel>

          <Panel
            title="Colores"
            right={
              <Button
                size="xs"
                // leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable
              cols={["Nombre", "Ganancia", "Acciones"]}
              rows={colores.map(([n, g]) => [
                n,
                g,
                <HStack key={n} justify="end">
                  <IconButton aria-label="edit" size="xs" colorPalette="teal">
                    <LuFilePen />
                  </IconButton>
                  <IconButton aria-label="delete" size="xs" colorPalette="pink">
                    <LuTrash2 />
                  </IconButton>
                </HStack>,
              ])}
            />
          </Panel>

          <Panel
            title="Colores (lista 2)"
            right={
              <Button
                size="xs"
                // leftIcon={<LuPlus />}
                colorPalette="teal"
              >
                Nuevo
              </Button>
            }
          >
            <SimpleTable cols={["Nombre", "Ganancia", "Acciones"]} rows={[]} />
          </Panel>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CotizadorAdminPage;
