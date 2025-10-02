import React from "react";
import {
  Box,
  Button,
  Field,
  Fieldset,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "../../components";

const CrearPedidoAdminPage = () => {
  const [cliente, setCliente] = React.useState("");
  const [producto, setProducto] = React.useState("");
  const [subproducto, setSubproducto] = React.useState("");
  const [cantidad, setCantidad] = React.useState<number>(11);
  const [observaciones, setObservaciones] = React.useState("");
  const [archivo, setArchivo] = React.useState<File | null>(null);

  const clientesOpts = [
    { label: "De Rentas", value: "rentas" },
    { label: "MarBet Gráfica", value: "marbet" },
    { label: "RomaGraf", value: "romagraf" },
  ];
  const productosOpts = [
    { label: "Anillados", value: "anillados" },
    { label: "Bajada Láser B&N", value: "bajada-bn" },
    { label: "Bajada Láser Color", value: "bajada-color" },
  ];
  const subproductosOpts = [
    { label: "Selecciona un subproducto", value: "" },
    { label: "Plástico espiralado", value: "espiralado" },
    { label: "Metálico (ringwire)", value: "metalico" },
  ];

  return (
    <Box px={6} py={8} maxW="7xl" mx="auto">
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 420px" }}
        gap={{ base: 8, md: 10 }}
        alignItems="start"
      >
        <Stack gap={4}>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"
            alt="Producto"
            borderRadius="md"
            objectFit="cover"
            maxH="320px"
          />

          <Text fontSize="sm" color="gray.600">
            <Text as="span" fontWeight="semibold">
              Producto:
            </Text>{" "}
            Anillados
          </Text>

          <Text fontSize="sm" color="gray.600" lineHeight="tall">
            Este producto es para anillar copias que traes o para anillar copias
            que vas a hacer con nosotros. Debes elegir el anillado que más se
            acerque a la cantidad de hojas que vas a querer anillar (la cantidad
            de hojas que se anillan depende del gramaje del papel. La referencia
            indicada es estipulada para hoja A4 de 80g).
            <br />
            Podés elegir anillado plástico espiralado o anillado metálico
            (ringwire). Incluye tapa y contratapa plástica.
          </Text>

          <Stack gap={1} color="gray.500" fontSize="xs">
            <Text>x</Text>
            <Text>11 impresiones</Text>
          </Stack>

          <Box borderTopWidth="1px" />
          <Text fontSize="xl" fontWeight="semibold" color="gray.700">
            Total: $ 0
          </Text>
        </Stack>

        <Stack gap={5}>
          <Heading size="md" color="gray.700">
            ¿Qué querés cotizar?
          </Heading>

          <Fieldset.Root size="sm" gap={4}>
            <Field.Root>
              <Field.Label>Cliente</Field.Label>
              <Select
                options={clientesOpts}
                value={cliente}
                onChange={setCliente}
                multiple={false}
                placeholder="Seleccione un cliente"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Producto</Field.Label>
              <Select
                options={productosOpts}
                value={producto}
                onChange={setProducto}
                multiple={false}
                placeholder="Seleccione un producto"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Subproducto</Field.Label>
              <Select
                options={subproductosOpts}
                value={subproducto}
                onChange={setSubproducto}
                multiple={false}
                placeholder="Seleccione un subproducto"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Cantidad</Field.Label>
              <Input
                type="number"
                size="sm"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                min={1}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Observaciones</Field.Label>
              <Textarea
                rows={4}
                size="sm"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Seleccioná el archivo a imprimir</Field.Label>
              <Input
                type="file"
                size="sm"
                onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
              />
              <Text mt={1} fontSize="xs" color="gray.500">
                Peso máximo 50MB
              </Text>
            </Field.Root>

            <HStack>
              <Button colorScheme="teal" size="sm">
                CONTINUAR
              </Button>
            </HStack>
          </Fieldset.Root>
        </Stack>
      </Grid>
    </Box>
  );
};

export default CrearPedidoAdminPage;
