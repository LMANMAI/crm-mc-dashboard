import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  Separator,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Select } from "../../components";

const NuevoPedidoAdminPage = () => {
  // mock options
  const clientes = [
    { label: "Seleccione un cliente", value: "" },
    { label: "Grafica 312", value: "grafica-312" },
    { label: "Octavio Felice", value: "octavio-felice" },
  ];

  const productos = [
    { label: "Seleccionar producto", value: "" },
    { label: "Bajada Láser B&N", value: "bl-bn", price: 1200 },
    { label: "Bajada Láser Color", value: "bl-color", price: 2800 },
    { label: "Anillados", value: "anillados", price: 4500 },
  ];

  const [cliente, setCliente] = React.useState<string>("");
  const [producto, setProducto] = React.useState<string>("");
  const [clienteReferido, setClienteReferido] = React.useState<string>("");
  const [fechaEntrega, setFechaEntrega] = React.useState<string>("");
  const [observaciones, setObservaciones] = React.useState<string>("");

  // total informativo en base al producto seleccionado (mock)
  const total = React.useMemo(() => {
    const p = productos.find((x) => x.value === producto) as
      | { label: string; value: string; price?: number }
      | undefined;
    return p?.price ?? 0;
  }, [producto]);

  const onComprar = () => {
    // acá prepararías el payload real
    const payload = {
      cliente,
      producto,
      clienteReferido,
      fechaEntrega,
      observaciones,
      total,
    };
    console.log("Nuevo pedido:", payload);
    // TODO: llamar a tu API (useFetch/axios) y navegar según corresponda
  };

  return (
    <Stack px={4} py={6} maxW="1400px" mx="auto" gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        Nuevo Pedido
      </Text>
      <Card.Root>
        <CardBody p={0}>
          <Box px={6} py={4}>
            <Heading as="h3" size="sm" color="gray.700">
              Pedido
            </Heading>
          </Box>
          <Separator />

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 320px" }}
            gap={6}
            px={6}
            py={6}
          >
            <GridItem>
              <Stack gap={4}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="sm" color="gray.600">
                        Cliente{" "}
                        <Text as="span" color="red.500">
                          *
                        </Text>
                      </Text>
                      <IconButton
                        aria-label="Agregar cliente"
                        size="xs"
                        variant="subtle"
                        colorPalette="teal"
                        onClick={() => console.log("Abrir modal nuevo cliente")}
                      >
                        <FaPlus />
                      </IconButton>
                    </HStack>

                    <Select
                      options={clientes}
                      value={cliente}
                      onChange={setCliente}
                      placeholder="Seleccione un cliente"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Producto{" "}
                      <Text as="span" color="red.500">
                        *
                      </Text>
                    </Text>

                    <Select
                      options={productos.map((p) => ({
                        label: p.label,
                        value: p.value,
                      }))}
                      value={producto}
                      onChange={setProducto}
                      placeholder="Seleccionar producto"
                    />
                  </Box>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Cliente referido
                    </Text>
                    <Select
                      options={clientes}
                      value={clienteReferido}
                      onChange={setClienteReferido}
                      placeholder="Seleccionar cliente"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Fecha de entrega
                    </Text>
                    <Input
                      type="date"
                      size="sm"
                      value={fechaEntrega}
                      onChange={(e) => setFechaEntrega(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Observaciones
                  </Text>
                  <Textarea
                    minH="140px"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Escribí aquí observaciones del pedido…"
                  />
                </Box>
              </Stack>

              <HStack justify="flex-end" mt={6}>
                <Button
                  colorPalette="teal"
                  onClick={onComprar}
                  disabled={!cliente || !producto}
                >
                  <FaCheck /> Comprar
                </Button>
              </HStack>
            </GridItem>

            <GridItem>
              <Box
                bg="white"
                border="1px"
                borderColor="gray.200"
                rounded="md"
                p={4}
              >
                <HStack justify="space-between" mb={1}>
                  <Text fontWeight="semibold">Total:</Text>
                  <Heading size="sm">$ {total.toLocaleString()}</Heading>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  El total es de carácter informativo y puede variar según la
                  configuración elegida.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </CardBody>
        <Card.Footer />
      </Card.Root>
    </Stack>
  );
};

export default NuevoPedidoAdminPage;
