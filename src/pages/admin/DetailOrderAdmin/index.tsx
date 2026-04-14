import React, { useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Portal,
  Separator,
  Stack,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaPrint,
  FaExchangeAlt,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaPlus,
  FaCheck,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Select from "../../../components/Select";

// ─── types ────────────────────────────────────────────────────────────────────
interface HistorialRow {
  id: number;
  estadoAnterior: string;
  estadoNuevo: string;
  usuario: string;
  fecha: string;
}
interface PagoRow {
  id: number;
  fecha: string;
  tipo: string;
  monto: number;
}
interface InsumoRow {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

// ─── mock data ────────────────────────────────────────────────────────────────
const MOCK_ORDER = {
  id: 1,
  nro: "85041",
  fecha: "19/08/2025",
  fechaCarga: "19/08/2025",
  cliente: "Octavio Felic",
  email: "octavio@email.com",
  trabajo: "Sticker Troquelado",
  producto: "Bajada Laser B&N",
  subproducto: "A4 B&N",
  medida: "21x29.7",
  cantidad: 1,
  color: "MyF",
  terminaciones: "Sin terminaciones",
  precio: 1980,
  estado: "paraEntregar",
  fechaEntrega: "25/08/2025",
};

const MOCK_HISTORIAL: HistorialRow[] = [
  { id: 1, estadoAnterior: "—", estadoNuevo: "1. Pendiente", usuario: "brian", fecha: "19/08/2025 08:00" },
  { id: 2, estadoAnterior: "1. Pendiente", estadoNuevo: "3. En producción", usuario: "brian", fecha: "19/08/2025 09:15" },
  { id: 3, estadoAnterior: "3. En producción", estadoNuevo: "5. Terminaciones", usuario: "lucia", fecha: "19/08/2025 14:30" },
  { id: 4, estadoAnterior: "5. Terminaciones", estadoNuevo: "7. Para Entregar", usuario: "brian", fecha: "20/08/2025 10:00" },
];

const ESTADO_OPTS = [
  { label: "1. Pendiente", value: "pendiente" },
  { label: "2. Recibido", value: "recibido" },
  { label: "3. En producción", value: "enProduccion" },
  { label: "4. Control de calidad", value: "controlCalidad" },
  { label: "5. Terminaciones", value: "terminaciones" },
  { label: "6. Listo", value: "listo" },
  { label: "7. Para Entregar", value: "paraEntregar" },
  { label: "Entregado", value: "entregado" },
];

const ESTADO_LABEL: Record<string, string> = Object.fromEntries(
  ESTADO_OPTS.map((o) => [o.value, o.label])
);

const ESTADO_COLOR: Record<string, string> = {
  pendiente: "yellow",
  recibido: "orange",
  enProduccion: "blue",
  controlCalidad: "purple",
  terminaciones: "gray",
  listo: "cyan",
  paraEntregar: "blue",
  entregado: "green",
};

// ─── Rich text editor ─────────────────────────────────────────────────────────
const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (cmd: string) => {
    document.execCommand(cmd, false);
    editorRef.current?.focus();
  };

  return (
    <Stack gap={2}>
      <HStack
        wrap="wrap"
        gap={1}
        px={2}
        py={1}
        bg="gray.50"
        borderWidth="1px"
        borderColor="gray.200"
        roundedTop="md"
      >
        {[
          { icon: <FaBold />, cmd: "bold" },
          { icon: <FaItalic />, cmd: "italic" },
          { icon: <FaUnderline />, cmd: "underline" },
        ].map(({ icon, cmd }) => (
          <IconButton key={cmd} size="xs" variant="ghost" aria-label={cmd} onClick={() => exec(cmd)}>
            {icon}
          </IconButton>
        ))}
        <Box w="1px" h="18px" bg="gray.200" mx={1} />
        {[
          { icon: <FaListUl />, cmd: "insertUnorderedList" },
          { icon: <FaListOl />, cmd: "insertOrderedList" },
        ].map(({ icon, cmd }) => (
          <IconButton key={cmd} size="xs" variant="ghost" aria-label={cmd} onClick={() => exec(cmd)}>
            {icon}
          </IconButton>
        ))}
        <Box w="1px" h="18px" bg="gray.200" mx={1} />
        {[
          { icon: <FaAlignLeft />, cmd: "justifyLeft" },
          { icon: <FaAlignCenter />, cmd: "justifyCenter" },
          { icon: <FaAlignRight />, cmd: "justifyRight" },
        ].map(({ icon, cmd }) => (
          <IconButton key={cmd} size="xs" variant="ghost" aria-label={cmd} onClick={() => exec(cmd)}>
            {icon}
          </IconButton>
        ))}
      </HStack>
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        minH="120px"
        p={3}
        borderWidth="1px"
        borderColor="gray.200"
        roundedBottom="md"
        fontSize="sm"
        outline="none"
        _focus={{ borderColor: "teal.400" }}
      />
      <Flex justify="flex-end">
        <Button size="sm" colorPalette="teal">
          <FaSave /> Guardar observaciones
        </Button>
      </Flex>
    </Stack>
  );
};

// ─── helpers ──────────────────────────────────────────────────────────────────
const SectionHeader = ({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <Flex
    align="center"
    justify="space-between"
    bg="teal.500"
    color="white"
    px={4}
    py={2}
    roundedTop="md"
  >
    <Text fontWeight="semibold" fontSize="sm">
      {children}
    </Text>
    {actions && <HStack gap={2}>{actions}</HStack>}
  </Flex>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <HStack justify="space-between" fontSize="sm">
    <Text fontWeight="semibold" color="gray.600" minW="145px">
      {label}:
    </Text>
    <Box flex="1" textAlign="right">{children}</Box>
  </HStack>
);

// ─── Page ──────────────────────────────────────────────────────────────────────
const DetailOrderAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateOrder = location.state?.order;
  const order = stateOrder ?? { ...MOCK_ORDER, id: Number(id) || 1 };

  // estado
  const [estado, setEstado] = React.useState<string>(order.estado ?? "paraEntregar");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [nuevoEstado, setNuevoEstado] = React.useState("");

  // campos técnicos producción
  const [pliego, setPliego] = React.useState("A4");
  const [cantPliegos, setCantPliegos] = React.useState("50");
  const [impresion, setImpresion] = React.useState("Digital B&N");
  const [notifEnabled, setNotifEnabled] = React.useState(false);
  const [notifDias, setNotifDias] = React.useState("1");
  const [nuevoPrint, setNuevoPrint] = React.useState("");

  // historial
  const [historial, setHistorial] = React.useState<HistorialRow[]>(MOCK_HISTORIAL);

  // pagos
  const [pagos, setPagos] = React.useState<PagoRow[]>([]);
  const [addingPago, setAddingPago] = React.useState(false);
  const [newPagoFecha, setNewPagoFecha] = React.useState("");
  const [newPagoTipo, setNewPagoTipo] = React.useState("");
  const [newPagoMonto, setNewPagoMonto] = React.useState("");

  // insumos
  const [insumos, setInsumos] = React.useState<InsumoRow[]>([
    { id: 1, nombre: "Papel A4 90g", cantidad: 2, precio: 450 },
  ]);
  const [addingInsumo, setAddingInsumo] = React.useState(false);
  const [newNombre, setNewNombre] = React.useState("");
  const [newCantidad, setNewCantidad] = React.useState("");
  const [newPrecio, setNewPrecio] = React.useState("");

  const precio = Number(order.precio ?? 1980);
  const totalPagos = pagos.reduce((s, p) => s + p.monto, 0);
  const totalInsumos = insumos.reduce((s, i) => s + i.cantidad * i.precio, 0);
  const saldo = precio - totalPagos;

  const handleCambiarEstado = () => {
    if (!nuevoEstado) return;
    const prev = ESTADO_LABEL[estado] ?? estado;
    const next = ESTADO_LABEL[nuevoEstado] ?? nuevoEstado;
    setEstado(nuevoEstado);
    setHistorial((h) => [
      ...h,
      {
        id: h.length + 1,
        estadoAnterior: prev,
        estadoNuevo: next,
        usuario: "admin",
        fecha: new Date().toLocaleString("es-AR"),
      },
    ]);
    setNuevoEstado("");
    setDialogOpen(false);
  };

  const handleConfirmPago = () => {
    if (!newPagoFecha || !newPagoTipo || !newPagoMonto) return;
    setPagos((p) => [
      ...p,
      { id: p.length + 1, fecha: newPagoFecha, tipo: newPagoTipo, monto: Number(newPagoMonto) },
    ]);
    setNewPagoFecha(""); setNewPagoTipo(""); setNewPagoMonto("");
    setAddingPago(false);
  };

  const handleConfirmInsumo = () => {
    if (!newNombre || !newCantidad || !newPrecio) return;
    setInsumos((ins) => [
      ...ins,
      { id: ins.length + 1, nombre: newNombre, cantidad: Number(newCantidad), precio: Number(newPrecio) },
    ]);
    setNewNombre(""); setNewCantidad(""); setNewPrecio("");
    setAddingInsumo(false);
  };

  return (
    <Stack gap={0} minH="100vh" bg="gray.50">
      {/* ── Page header ── */}
      <Flex bg="teal.600" color="white" px={6} py={3} align="center" justify="space-between">
        <HStack gap={3}>
          <IconButton
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "teal.700" }}
            aria-label="Volver"
            onClick={() => navigate("/pedidos-admin")}
          >
            <FaArrowLeft />
          </IconButton>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Pedido N° {order.nro ?? order.id}
            </Text>
            <Text fontSize="xs" opacity={0.85}>
              Fecha de carga: {order.fechaCarga ?? order.fecha ?? "—"}
            </Text>
          </Box>
        </HStack>
        <Tag.Root size="lg" colorPalette={ESTADO_COLOR[estado] ?? "gray"} variant="solid">
          <Tag.Label fontWeight="bold">{ESTADO_LABEL[estado] ?? estado}</Tag.Label>
        </Tag.Root>
      </Flex>

      <Stack gap={5} p={5}>
        {/* ── Row 1: Info + Detalles ── */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={5}>

          {/* Información del pedido */}
          <Card>
            <SectionHeader
              actions={
                <>
                  <Button
                    size="xs"
                    variant="outline"
                    color="white"
                    borderColor="whiteAlpha.600"
                    _hover={{ bg: "teal.600" }}
                    onClick={() => window.print()}
                  >
                    <FaPrint /> Imprimir
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    color="white"
                    borderColor="whiteAlpha.600"
                    _hover={{ bg: "teal.600" }}
                    onClick={() => setDialogOpen(true)}
                  >
                    <FaExchangeAlt /> Cambiar Estado
                  </Button>
                </>
              }
            >
              Información del pedido
            </SectionHeader>
            <Stack gap={2} p={4}>
              <Row label="Pedido N°">{order.nro ?? order.id}</Row>
              <Row label="Cliente">{order.cliente ?? "—"}</Row>
              <Row label="Email">{order.email ?? "—"}</Row>
              <Row label="Trabajo">{order.trabajo ?? "—"}</Row>
              <Row label="Fecha de la orden">{order.fecha ?? "—"}</Row>
              <Row label="Fecha de entrega">{order.fechaEntrega ?? "—"}</Row>
              <Row label="Precio">$ {precio.toLocaleString("es-AR")}</Row>
              <Row label="Estado">
                <Tag.Root colorPalette={ESTADO_COLOR[estado] ?? "gray"} size="sm">
                  <Tag.Label>{ESTADO_LABEL[estado] ?? estado}</Tag.Label>
                </Tag.Root>
              </Row>
            </Stack>
          </Card>

          {/* Detalles de la orden */}
          <Card>
            <SectionHeader>Detalles de la orden de trabajo</SectionHeader>
            <Stack gap={3} p={4} fontSize="sm">
              <Row label="Producto">{order.trabajo ?? "—"}</Row>
              <Row label="Sub-Producto">{order.subproducto ?? "—"}</Row>
              <Row label="Medida">{order.medida ?? "—"}</Row>
              <Row label="Cantidad">{order.cantidad ?? "—"}</Row>
              <Row label="Color">{order.color ?? "—"}</Row>
              <Row label="Terminaciones">{order.terminaciones ?? "—"}</Row>

              <Separator />
              <Text fontWeight="bold" fontSize="xs" color="teal.600" textTransform="uppercase" letterSpacing="wide">
                Producción
              </Text>

              <HStack>
                <Text fontWeight="semibold" color="gray.600" minW="145px" fontSize="sm">Pliego:</Text>
                <Input size="sm" value={pliego} onChange={(e) => setPliego(e.target.value)} maxW="120px" />
              </HStack>
              <HStack>
                <Text fontWeight="semibold" color="gray.600" minW="145px" fontSize="sm">Cant. pliegos:</Text>
                <Input size="sm" type="number" value={cantPliegos} onChange={(e) => setCantPliegos(e.target.value)} maxW="80px" />
              </HStack>
              <HStack>
                <Text fontWeight="semibold" color="gray.600" minW="145px" fontSize="sm">Impresión:</Text>
                <Input size="sm" value={impresion} onChange={(e) => setImpresion(e.target.value)} maxW="180px" />
              </HStack>

              <Separator />
              <Text fontWeight="bold" fontSize="xs" color="teal.600" textTransform="uppercase" letterSpacing="wide">
                Notificaciones
              </Text>
              <HStack>
                <Checkbox.Root
                  checked={notifEnabled}
                  onCheckedChange={(e) => setNotifEnabled(!!e.checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm">Activar notificación</Checkbox.Label>
                </Checkbox.Root>
                {notifEnabled && (
                  <HStack>
                    <Input
                      size="sm"
                      type="number"
                      value={notifDias}
                      onChange={(e) => setNotifDias(e.target.value)}
                      maxW="60px"
                    />
                    <Text fontSize="sm" color="gray.500">días previos</Text>
                  </HStack>
                )}
              </HStack>

              <Separator />
              <HStack>
                <Text fontWeight="semibold" color="gray.600" minW="145px">Archivo:</Text>
                <Input size="sm" type="file" />
              </HStack>
              <HStack>
                <Text fontWeight="semibold" color="gray.600" minW="145px">Link archivo:</Text>
                <Input size="sm" placeholder="URL..." />
                <Button size="sm" colorPalette="teal">Subir</Button>
              </HStack>

              <Separator />
              <Text fontWeight="bold" fontSize="xs" color="teal.600" textTransform="uppercase" letterSpacing="wide">
                Nuevo Print del pedido
              </Text>
              <Textarea
                size="sm"
                rows={3}
                placeholder="Descripción del nuevo print..."
                value={nuevoPrint}
                onChange={(e) => setNuevoPrint(e.target.value)}
              />
              <Flex justify="flex-end">
                <Button size="sm" colorPalette="teal">Guardar print</Button>
              </Flex>
            </Stack>
          </Card>
        </Grid>

        {/* ── Observaciones full width ── */}
        <Card>
          <SectionHeader>Observaciones</SectionHeader>
          <Box p={4}>
            <RichTextEditor />
          </Box>
        </Card>

        {/* ── Historial de estados full width ── */}
        <Card>
          <SectionHeader>Historial de estados</SectionHeader>
          <Box overflowX="auto">
            <Box as="table" w="100%" fontSize="sm" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="gray.50">
                <Box as="tr">
                  {["#", "Estado anterior", "Estado nuevo", "Usuario", "Fecha / Hora"].map((h) => (
                    <Box
                      key={h}
                      as="th"
                      px={4}
                      py={2}
                      textAlign="left"
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="xs"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      borderBottomWidth="1px"
                      borderColor="gray.200"
                    >
                      {h}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box as="tbody">
                {historial.map((row, i) => (
                  <Box
                    key={row.id}
                    as="tr"
                    bg={i % 2 === 0 ? "white" : "gray.50"}
                    _hover={{ bg: "teal.50" }}
                  >
                    <Box as="td" px={4} py={2} color="gray.400">{row.id}</Box>
                    <Box as="td" px={4} py={2}>
                      <Tag.Root size="sm" colorPalette="gray" variant="subtle">
                        <Tag.Label>{row.estadoAnterior}</Tag.Label>
                      </Tag.Root>
                    </Box>
                    <Box as="td" px={4} py={2}>
                      <Tag.Root size="sm" colorPalette="teal" variant="subtle">
                        <Tag.Label>{row.estadoNuevo}</Tag.Label>
                      </Tag.Root>
                    </Box>
                    <Box as="td" px={4} py={2} fontWeight="medium">{row.usuario}</Box>
                    <Box as="td" px={4} py={2} color="gray.500">{row.fecha}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Card>

        {/* ── Finanzas ── */}
        <Grid templateColumns={{ base: "1fr", lg: "220px 1fr 1fr" }} gap={5} alignItems="start">

          {/* Resumen de saldos */}
          <Card>
            <SectionHeader>Resumen de saldos</SectionHeader>
            <Stack gap={0}>
              {[
                { label: "Total orden", val: precio, color: "gray.700" },
                { label: "Total insumos", val: totalInsumos, color: "gray.700" },
                { label: "Total pagos", val: totalPagos, color: "gray.700" },
              ].map(({ label, val }) => (
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
                  <Text fontWeight="medium">$ {val.toLocaleString("es-AR")}</Text>
                </HStack>
              ))}
              <HStack justify="space-between" px={4} py={3} bg="teal.50" fontSize="sm">
                <Text fontWeight="bold" color="teal.700">Saldo</Text>
                <Text fontWeight="bold" color={saldo > 0 ? "red.500" : "green.500"}>
                  $ {saldo.toLocaleString("es-AR")}
                </Text>
              </HStack>
            </Stack>
          </Card>

          {/* Pagos realizados */}
          <Card>
            <SectionHeader
              actions={
                <Button
                  size="xs"
                  variant="outline"
                  color="white"
                  borderColor="whiteAlpha.600"
                  _hover={{ bg: "teal.600" }}
                  onClick={() => setAddingPago(true)}
                >
                  <FaPlus /> Registrar nuevo pago
                </Button>
              }
            >
              Pagos realizados
            </SectionHeader>
            <Box overflowX="auto">
              <Box as="table" w="100%" fontSize="sm" style={{ borderCollapse: "collapse" }}>
                <Box as="thead" bg="gray.50">
                  <Box as="tr">
                    {["Fecha", "Tipo", "Monto"].map((h) => (
                      <Box key={h} as="th" px={4} py={2} textAlign="left" fontWeight="semibold"
                        color="gray.600" fontSize="xs" textTransform="uppercase" letterSpacing="wide"
                        borderBottomWidth="1px" borderColor="gray.200">
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box as="tbody">
                  {pagos.map((p) => (
                    <Box key={p.id} as="tr" borderBottomWidth="1px" borderColor="gray.100" _hover={{ bg: "gray.50" }}>
                      <Box as="td" px={4} py={2}>{p.fecha}</Box>
                      <Box as="td" px={4} py={2}>{p.tipo}</Box>
                      <Box as="td" px={4} py={2} textAlign="right" fontWeight="medium">
                        $ {p.monto.toLocaleString("es-AR")}
                      </Box>
                    </Box>
                  ))}
                  {addingPago && (
                    <Box as="tr" bg="teal.50">
                      <Box as="td" px={2} py={1}>
                        <Input size="xs" type="date" value={newPagoFecha} onChange={(e) => setNewPagoFecha(e.target.value)} />
                      </Box>
                      <Box as="td" px={2} py={1}>
                        <Input size="xs" placeholder="Efectivo, Cheque…" value={newPagoTipo} onChange={(e) => setNewPagoTipo(e.target.value)} />
                      </Box>
                      <Box as="td" px={2} py={1}>
                        <HStack gap={1}>
                          <Input size="xs" type="number" placeholder="0" value={newPagoMonto}
                            onChange={(e) => setNewPagoMonto(e.target.value)} maxW="80px" />
                          <IconButton size="xs" colorPalette="teal" aria-label="confirmar" onClick={handleConfirmPago}><FaCheck /></IconButton>
                          <IconButton size="xs" variant="ghost" aria-label="cancelar" onClick={() => setAddingPago(false)}><FaTimes /></IconButton>
                        </HStack>
                      </Box>
                    </Box>
                  )}
                  {pagos.length === 0 && !addingPago && (
                    <tr>
                      <td colSpan={3} style={{ padding: "24px 16px", textAlign: "center", color: "#a0aec0", fontSize: "0.875rem" }}>
                        Sin pagos registrados
                      </td>
                    </tr>
                  )}
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Insumos de la orden */}
          <Card>
            <SectionHeader
              actions={
                <Button
                  size="xs"
                  variant="outline"
                  color="white"
                  borderColor="whiteAlpha.600"
                  _hover={{ bg: "teal.600" }}
                  onClick={() => setAddingInsumo(true)}
                >
                  <FaPlus /> Agregar insumo
                </Button>
              }
            >
              Insumos de la orden
            </SectionHeader>
            <Box overflowX="auto">
              <Box as="table" w="100%" fontSize="sm" style={{ borderCollapse: "collapse" }}>
                <Box as="thead" bg="gray.50">
                  <Box as="tr">
                    {["Nombre", "Cant.", "Precio", "Subtotal", ""].map((h, i) => (
                      <Box key={i} as="th" px={3} py={2} textAlign="left" fontWeight="semibold"
                        color="gray.600" fontSize="xs" textTransform="uppercase" letterSpacing="wide"
                        borderBottomWidth="1px" borderColor="gray.200">
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box as="tbody">
                  {insumos.map((ins) => (
                    <Box key={ins.id} as="tr" borderBottomWidth="1px" borderColor="gray.100" _hover={{ bg: "gray.50" }}>
                      <Box as="td" px={3} py={2}>{ins.nombre}</Box>
                      <Box as="td" px={3} py={2}>{ins.cantidad}</Box>
                      <Box as="td" px={3} py={2}>$ {ins.precio.toLocaleString("es-AR")}</Box>
                      <Box as="td" px={3} py={2} fontWeight="medium">
                        $ {(ins.cantidad * ins.precio).toLocaleString("es-AR")}
                      </Box>
                      <Box as="td" px={3} py={2}>
                        <IconButton size="xs" variant="ghost" colorPalette="red" aria-label="eliminar"
                          onClick={() => setInsumos((prev) => prev.filter((i) => i.id !== ins.id))}>
                          <FaTimes />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                  {addingInsumo && (
                    <Box as="tr" bg="teal.50">
                      <Box as="td" px={2} py={1}>
                        <Input size="xs" placeholder="Nombre" value={newNombre} onChange={(e) => setNewNombre(e.target.value)} />
                      </Box>
                      <Box as="td" px={2} py={1}>
                        <Input size="xs" type="number" placeholder="0" value={newCantidad}
                          onChange={(e) => setNewCantidad(e.target.value)} maxW="60px" />
                      </Box>
                      <Box as="td" px={2} py={1}>
                        <Input size="xs" type="number" placeholder="0" value={newPrecio}
                          onChange={(e) => setNewPrecio(e.target.value)} maxW="80px" />
                      </Box>
                      <Box as="td" px={2} py={1} color="gray.400" fontSize="xs">auto</Box>
                      <Box as="td" px={2} py={1}>
                        <HStack gap={1}>
                          <IconButton size="xs" colorPalette="teal" aria-label="confirmar" onClick={handleConfirmInsumo}><FaCheck /></IconButton>
                          <IconButton size="xs" variant="ghost" aria-label="cancelar" onClick={() => setAddingInsumo(false)}><FaTimes /></IconButton>
                        </HStack>
                      </Box>
                    </Box>
                  )}
                  {insumos.length === 0 && !addingInsumo && (
                    <tr>
                      <td colSpan={5} style={{ padding: "24px 16px", textAlign: "center", color: "#a0aec0", fontSize: "0.875rem" }}>
                        Sin insumos cargados
                      </td>
                    </tr>
                  )}
                </Box>
                {insumos.length > 0 && (
                  <Box as="tfoot">
                    <tr style={{ background: "#f7fafc", borderTop: "2px solid #e2e8f0" }}>
                      <td colSpan={3} style={{ padding: "8px 12px", textAlign: "right", fontWeight: "bold", fontSize: "0.875rem" }}>
                        Total insumos:
                      </td>
                      <td style={{ padding: "8px 12px", fontWeight: "bold", color: "#2c7a7b" }}>
                        $ {totalInsumos.toLocaleString("es-AR")}
                      </td>
                      <td />
                    </tr>
                  </Box>
                )}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* ── Footer ── */}
        <Flex justify="center" py={6}>
          <Text fontSize="xs" color="gray.400" letterSpacing="wide">
            M&amp;C IT Solutions — Panel de Administración
          </Text>
        </Flex>
      </Stack>

      {/* ── Dialog Cambiar Estado ── */}
      <Dialog.Root open={dialogOpen} onOpenChange={(e) => setDialogOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Cambiar Estado del Pedido</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <HStack>
                    <Text fontSize="sm" color="gray.600">Estado actual:</Text>
                    <Tag.Root colorPalette={ESTADO_COLOR[estado] ?? "gray"} size="sm">
                      <Tag.Label>{ESTADO_LABEL[estado] ?? estado}</Tag.Label>
                    </Tag.Root>
                  </HStack>
                  <Select
                    label="Nuevo estado"
                    options={ESTADO_OPTS}
                    value={nuevoEstado}
                    onChange={setNuevoEstado}
                    placeholder="Seleccioná un estado..."
                  />
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button colorPalette="teal" onClick={handleCambiarEstado} disabled={!nuevoEstado}>
                  Confirmar cambio
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default DetailOrderAdminPage;
