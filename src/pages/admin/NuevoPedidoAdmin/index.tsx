import React from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Portal,
  Separator,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaPlus, FaCheck, FaCheckCircle } from "react-icons/fa";
import { LuLink, LuPaperclip } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Select } from "../../../components";

// ─── mock data ────────────────────────────────────────────────────────────────
const CLIENTES = [
  { label: "Grafica 312", value: "grafica-312" },
  { label: "Octavio Felice", value: "octavio-felice" },
  { label: "Maria Burgueño", value: "maria-burgueno" },
];

const PRODUCTOS = [
  { label: "Bajada Láser B&N", value: "bl-bn", price: 1200 },
  { label: "Bajada Láser Color", value: "bl-color", price: 2800 },
  { label: "Anillados", value: "anillados", price: 4500 },
  { label: "Sticker Troquelado", value: "sticker", price: 1980 },
  { label: "Flyer A5", value: "flyer-a5", price: 900 },
];

// ─── helpers ──────────────────────────────────────────────────────────────────
const Label = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <Text fontSize="sm" color="gray.600" mb={1}>
    {children}{" "}
    {required && (
      <Text as="span" color="red.500">
        *
      </Text>
    )}
  </Text>
);

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <Text fontSize="xs" color="red.500" mt={0.5}>
      {msg}
    </Text>
  ) : null;

// ─── Page ──────────────────────────────────────────────────────────────────────
const NuevoPedidoAdminPage: React.FC = () => {
  const navigate = useNavigate();

  // form state
  const [cliente, setCliente] = React.useState("");
  const [producto, setProducto] = React.useState("");
  const [cantidad, setCantidad] = React.useState(1);
  const [clienteReferido, setClienteReferido] = React.useState("");
  const [fechaEntrega, setFechaEntrega] = React.useState("");
  const [observaciones, setObservaciones] = React.useState("");

  // archivo / link toggle
  const [cargaTipo, setCargaTipo] = React.useState<"archivo" | "link">("archivo");
  const [archivo, setArchivo] = React.useState<File | null>(null);
  const [link, setLink] = React.useState("");

  // validation
  const [submitted, setSubmitted] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const errors = {
    cliente: submitted && !cliente ? "El cliente es obligatorio." : undefined,
    producto: submitted && !producto ? "El producto es obligatorio." : undefined,
    cantidad: submitted && cantidad < 1 ? "La cantidad mínima es 1." : undefined,
  };

  // real-time total
  const precioUnitario = React.useMemo(() => {
    return PRODUCTOS.find((p) => p.value === producto)?.price ?? 0;
  }, [producto]);

  const total = precioUnitario * cantidad;

  const productoLabel = PRODUCTOS.find((p) => p.value === producto)?.label ?? "";

  const resetForm = () => {
    setCliente("");
    setProducto("");
    setCantidad(1);
    setClienteReferido("");
    setFechaEntrega("");
    setObservaciones("");
    setCargaTipo("archivo");
    setArchivo(null);
    setLink("");
    setSubmitted(false);
  };

  const handleComprar = () => {
    setSubmitted(true);
    if (!cliente || !producto || cantidad < 1) return;
    setSuccessOpen(true);
  };

  // ── Segmented control for archivo/link
  const ToggleBtn = ({
    value,
    icon,
    label,
  }: {
    value: "archivo" | "link";
    icon: React.ReactNode;
    label: string;
  }) => (
    <Button
      size="sm"
      variant={cargaTipo === value ? "solid" : "outline"}
      colorPalette={cargaTipo === value ? "teal" : "gray"}
      onClick={() => setCargaTipo(value)}
      flex="1"
    >
      {icon} {label}
    </Button>
  );

  return (
    <Stack px={4} py={6} gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        Nuevo Pedido
      </Text>

      <Card.Root>
        <Card.Body p={0}>
          {/* ── Header strip with total ── */}
          <Flex
            px={6}
            py={3}
            justify="space-between"
            align="center"
            borderBottomWidth="1px"
            borderColor="gray.200"
          >
            <Text fontWeight="semibold" color="gray.700">
              Pedido
            </Text>
            <Box textAlign="right">
              <Text fontSize="xs" color="gray.400" mb={0.5}>
                Total estimado
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="teal.600" lineHeight="1">
                $ {total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </Text>
              {precioUnitario > 0 && (
                <Text fontSize="xs" color="gray.400">
                  {productoLabel} × {cantidad} u.
                </Text>
              )}
            </Box>
          </Flex>

          <Separator />

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 300px" }}
            gap={6}
            px={6}
            py={6}
          >
            {/* ── Left: form fields ── */}
            <GridItem>
              <Stack gap={5}>
                {/* Row 1: Cliente + Producto */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Label required>Cliente</Label>
                      <IconButton
                        aria-label="Agregar cliente"
                        size="xs"
                        variant="subtle"
                        colorPalette="teal"
                        onClick={() => console.log("Nuevo cliente")}
                      >
                        <FaPlus />
                      </IconButton>
                    </HStack>
                    <Select
                      options={CLIENTES}
                      value={cliente}
                      onChange={setCliente}
                      placeholder="Seleccione un cliente"
                    />
                    <FieldError msg={errors.cliente} />
                  </Box>

                  <Box>
                    <Label required>Producto</Label>
                    <Select
                      options={PRODUCTOS.map((p) => ({ label: p.label, value: p.value }))}
                      value={producto}
                      onChange={setProducto}
                      placeholder="Seleccionar producto"
                    />
                    <FieldError msg={errors.producto} />
                  </Box>
                </Grid>

                {/* Row 2: Cantidad + Cliente referido + Fecha */}
                <Grid templateColumns={{ base: "1fr", md: "120px 1fr 1fr" }} gap={4}>
                  <Box>
                    <Label required>Cantidad</Label>
                    <Input
                      type="number"
                      size="sm"
                      min={1}
                      value={cantidad}
                      onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                      borderColor={errors.cantidad ? "red.400" : undefined}
                    />
                    <FieldError msg={errors.cantidad} />
                  </Box>

                  <Box>
                    <Label>Cliente referido</Label>
                    <Select
                      options={CLIENTES}
                      value={clienteReferido}
                      onChange={setClienteReferido}
                      placeholder="Seleccionar cliente"
                    />
                  </Box>

                  <Box>
                    <Label>Fecha de entrega</Label>
                    <Input
                      type="date"
                      size="sm"
                      value={fechaEntrega}
                      onChange={(e) => setFechaEntrega(e.target.value)}
                    />
                  </Box>
                </Grid>

                {/* Row 3: Archivo / Link toggle */}
                <Box>
                  <Label>Archivo del pedido</Label>
                  <HStack mb={3} maxW="280px">
                    <ToggleBtn value="archivo" icon={<LuPaperclip />} label="Archivo" />
                    <ToggleBtn value="link" icon={<LuLink />} label="Link" />
                  </HStack>

                  {cargaTipo === "archivo" ? (
                    <Box
                      borderWidth="2px"
                      borderStyle="dashed"
                      borderColor={archivo ? "teal.300" : "gray.200"}
                      rounded="md"
                      p={5}
                      textAlign="center"
                      bg={archivo ? "teal.50" : "gray.50"}
                      cursor="pointer"
                      onClick={() => document.getElementById("file-input")?.click()}
                      _hover={{ borderColor: "teal.300", bg: "teal.50" }}
                      transition="all 0.2s"
                    >
                      <input
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                      />
                      {archivo ? (
                        <Stack gap={1} align="center">
                          <FaCheck color="teal" />
                          <Text fontSize="sm" fontWeight="medium" color="teal.600">
                            {archivo.name}
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            {(archivo.size / 1024 / 1024).toFixed(2)} MB
                          </Text>
                        </Stack>
                      ) : (
                        <Stack gap={1} align="center">
                          <LuPaperclip size={20} color="#a0aec0" />
                          <Text fontSize="sm" color="gray.500">
                            Hacé clic para seleccionar un archivo
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            Peso máximo 96 MB
                          </Text>
                        </Stack>
                      )}
                    </Box>
                  ) : (
                    <Input
                      size="sm"
                      placeholder="https://drive.google.com/..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  )}
                </Box>

                {/* Row 4: Observaciones full width */}
                <Box>
                  <Label>Observaciones</Label>
                  <Textarea
                    minH="120px"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Escribí aquí observaciones del pedido…"
                    resize="vertical"
                  />
                </Box>
              </Stack>

              <Flex justify="flex-end" mt={6}>
                <Button
                  colorPalette="teal"
                  size="md"
                  onClick={handleComprar}
                >
                  <FaCheck /> Comprar
                </Button>
              </Flex>
            </GridItem>

            {/* ── Right: summary card ── */}
            <GridItem>
              <Stack gap={3}>
                <Box
                  bg="white"
                  borderWidth="1px"
                  borderColor="gray.200"
                  rounded="md"
                  overflow="hidden"
                >
                  <Box bg="teal.500" px={4} py={2}>
                    <Text fontWeight="semibold" color="white" fontSize="sm">
                      Resumen del pedido
                    </Text>
                  </Box>
                  <Stack gap={0}>
                    {[
                      ["Cliente", CLIENTES.find((c) => c.value === cliente)?.label ?? "—"],
                      ["Producto", productoLabel || "—"],
                      ["Cantidad", String(cantidad)],
                      ["Precio unitario", precioUnitario > 0 ? `$ ${precioUnitario.toLocaleString("es-AR")}` : "—"],
                      ["Fecha entrega", fechaEntrega || "—"],
                    ].map(([label, val]) => (
                      <HStack
                        key={label}
                        justify="space-between"
                        px={4}
                        py={2}
                        borderBottomWidth="1px"
                        borderColor="gray.100"
                        fontSize="sm"
                      >
                        <Text color="gray.500">{label}</Text>
                        <Text fontWeight="medium" textAlign="right" maxW="140px" truncate>
                          {val}
                        </Text>
                      </HStack>
                    ))}
                    <HStack
                      justify="space-between"
                      px={4}
                      py={3}
                      bg="teal.50"
                      fontSize="sm"
                    >
                      <Text fontWeight="bold" color="teal.700">Total</Text>
                      <Text fontWeight="bold" color="teal.700" fontSize="lg">
                        $ {total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                      </Text>
                    </HStack>
                  </Stack>
                </Box>

                <Text fontSize="xs" color="gray.400" textAlign="center">
                  El total es de carácter informativo y puede variar según la
                  configuración elegida.
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* ── Success modal ── */}
      <Dialog.Root open={successOpen} onOpenChange={(e) => setSuccessOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body py={8}>
                <Stack gap={4} align="center" textAlign="center">
                  <Box color="green.400" fontSize="5xl">
                    <FaCheckCircle />
                  </Box>
                  <Stack gap={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      ¡Perfecto!
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Tu pedido fue registrado correctamente.
                    </Text>
                    {productoLabel && (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        <Text as="span" fontWeight="semibold">{productoLabel}</Text>
                        {" "}× {cantidad} u. —{" "}
                        <Text as="span" fontWeight="semibold" color="teal.600">
                          $ {total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                        </Text>
                      </Text>
                    )}
                  </Stack>
                  <HStack gap={3} mt={2}>
                    <Button
                      variant="outline"
                      colorPalette="teal"
                      onClick={() => {
                        resetForm();
                        setSuccessOpen(false);
                      }}
                    >
                      Nuevo pedido
                    </Button>
                    <Button
                      colorPalette="teal"
                      onClick={() => {
                        setSuccessOpen(false);
                        navigate("/historial-admin");
                      }}
                    >
                      <FaCheck /> Aceptar
                    </Button>
                  </HStack>
                </Stack>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default NuevoPedidoAdminPage;
