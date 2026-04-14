import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuPrinter,
  LuTrash2,
  LuEye,
  LuArrowLeft,
  LuPlus,
  LuPencil,
  LuX,
} from "react-icons/lu";
import Select from "../../../components/Select";

// ─── types ────────────────────────────────────────────────────────────────────
type OrdenEstado = "pendiente" | "enProduccion" | "terminaciones" | "paraEntregar" | "entregado";

interface OrdenItem {
  nro: string;
  producto: string;
  tamano: string;
  terminacion: string;
  precio: number;
  estado: OrdenEstado;
}

interface Proyecto {
  id: number;
  nro: string;
  cliente: string;
  empresa: string;
  sector: string;
  descripcion: string;
  ordenes: OrdenItem[];
}

// ─── constants ────────────────────────────────────────────────────────────────
const ESTADO_COLOR: Record<OrdenEstado, string> = {
  pendiente: "yellow",
  enProduccion: "purple",
  terminaciones: "gray",
  paraEntregar: "blue",
  entregado: "green",
};

const ESTADO_LABEL: Record<OrdenEstado, string> = {
  pendiente: "1. Pendiente",
  enProduccion: "3. En producción",
  terminaciones: "5. Terminaciones",
  paraEntregar: "7. Para Entregar",
  entregado: "Entregado",
};

const SECTOR_OPTS = [
  { label: "Administración", value: "administracion" },
  { label: "Diseño", value: "diseno" },
  { label: "Impresión", value: "impresion" },
  { label: "Terminaciones", value: "terminaciones" },
  { label: "Entrega", value: "entrega" },
];

// ─── mock data ────────────────────────────────────────────────────────────────
const MOCK_PROYECTOS: Proyecto[] = [
  {
    id: 39203,
    nro: "39203",
    cliente: "Octavio Felice",
    empresa: "-",
    sector: "impresion",
    descripcion: "Trabajo de impresión para campaña publicitaria",
    ordenes: [
      { nro: "94871", producto: "Flyer A5", tamano: "A5", terminacion: "Sin laminado", precio: 3200, estado: "enProduccion" },
      { nro: "94866", producto: "Banner", tamano: "100x200cm", terminacion: "Ojales", precio: 8500, estado: "paraEntregar" },
    ],
  },
  {
    id: 35200,
    nro: "35200",
    cliente: "Gráfica 312",
    empresa: "Gráfica 312 (g)",
    sector: "diseno",
    descripcion: "-",
    ordenes: [
      { nro: "8942", producto: "Tarjetas", tamano: "9x5cm", terminacion: "Barniz UV", precio: 1500, estado: "terminaciones" },
    ],
  },
  {
    id: 35199,
    nro: "35199",
    cliente: "Octavio Felice",
    empresa: "-",
    sector: "-",
    descripcion: "-",
    ordenes: [
      { nro: "8939", producto: "Folleto A4", tamano: "A4", terminacion: "Plegado", precio: 2200, estado: "pendiente" },
      { nro: "8940", producto: "Afiche", tamano: "A3", terminacion: "Sin terminacion", precio: 1800, estado: "paraEntregar" },
      { nro: "8941", producto: "Sticker", tamano: "5x5cm", terminacion: "Troquelado", precio: 900, estado: "entregado" },
    ],
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────
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
    fontWeight="semibold"
    fontSize="sm"
    px={4}
    py={2}
    roundedTop="md"
  >
    <Text fontWeight="semibold">{children}</Text>
    {actions && <HStack gap={2}>{actions}</HStack>}
  </Flex>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

const OrdenBadge = ({ orden }: { orden: OrdenItem }) => (
  <Tag.Root size="sm" colorPalette={ESTADO_COLOR[orden.estado]} variant="subtle" mr={1} mb={1}>
    <Tag.Label fontWeight="medium">{orden.nro}</Tag.Label>
  </Tag.Root>
);

const TH = ({ children, right }: { children?: React.ReactNode; right?: boolean }) => (
  <Box
    as="th"
    px={4}
    py={2}
    textAlign={right ? "right" : "left"}
    fontWeight="semibold"
    color="gray.500"
    fontSize="xs"
    textTransform="uppercase"
    letterSpacing="wide"
    borderBottomWidth="1px"
    borderColor="gray.200"
    bg="gray.50"
    whiteSpace="nowrap"
  >
    {children}
  </Box>
);

const TD = ({ children, right }: { children?: React.ReactNode; right?: boolean }) => (
  <Box
    as="td"
    px={4}
    py={2}
    fontSize="sm"
    textAlign={right ? "right" : "left"}
    borderBottomWidth="1px"
    borderColor="gray.100"
    verticalAlign="middle"
  >
    {children}
  </Box>
);

// ─── List view ────────────────────────────────────────────────────────────────
const DeleteConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) onCancel(); }}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text fontSize="sm" color="gray.600">{description}</Text>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button colorPalette="pink" onClick={onConfirm}>Eliminar</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

const ListView = ({
  proyectos,
  onDetail,
  onDelete,
}: {
  proyectos: Proyecto[];
  onDetail: (p: Proyecto) => void;
  onDelete: (id: number) => void;
}) => {
  const [search, setSearch] = React.useState("");
  const [pendingDeleteId, setPendingDeleteId] = React.useState<number | null>(null);
  const pendingProyecto = proyectos.find((p) => p.id === pendingDeleteId);

  const filtered = proyectos.filter(
    (p) =>
      p.nro.includes(search) ||
      p.cliente.toLowerCase().includes(search.toLowerCase()) ||
      p.empresa.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack px={4} py={6} gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        Módulo de administración de proyectos
      </Text>

      <Card>
        <SectionHeader>Todos los proyectos</SectionHeader>

        <Flex p={3} justify="flex-end" gap={3} wrap="wrap">
          <HStack>
            <Input
              size="sm"
              placeholder="Buscar por nro, cliente…"
              w={{ base: "200px", md: "280px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton size="sm" aria-label="buscar" variant="outline">
              <LuSearch />
            </IconButton>
          </HStack>
        </Flex>

        <Box px={3} pb={3} overflowX="auto">
          <Box as="table" w="100%" style={{ borderCollapse: "collapse" }}>
            <Box as="thead">
              <Box as="tr">
                <TH>Nro</TH>
                <TH>Órdenes</TH>
                <TH>Cliente</TH>
                <TH>Empresa</TH>
                <TH>Sector</TH>
                <TH>Descripción</TH>
                <TH>Acciones</TH>
              </Box>
            </Box>
            <Box as="tbody">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "24px", color: "#a0aec0" }}>
                    Sin resultados
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <Box key={p.id} as="tr" _hover={{ bg: "gray.50" }}>
                    <TD>
                      <Text fontWeight="semibold" color="teal.600">{p.nro}</Text>
                    </TD>
                    <TD>
                      <Flex wrap="wrap" gap={0}>
                        {p.ordenes.map((o) => (
                          <OrdenBadge key={o.nro} orden={o} />
                        ))}
                      </Flex>
                    </TD>
                    <TD>{p.cliente}</TD>
                    <TD>{p.empresa}</TD>
                    <TD>{p.sector}</TD>
                    <TD>
                      <Text maxW="160px" truncate>{p.descripcion}</Text>
                    </TD>
                    <TD>
                      <HStack gap={1} justify="center">
                        <IconButton
                          size="xs"
                          colorPalette="teal"
                          variant="subtle"
                          aria-label="detalle"
                          title="Ver detalle"
                          onClick={() => onDetail(p)}
                        >
                          <LuEye />
                        </IconButton>
                        <IconButton
                          size="xs"
                          colorPalette="yellow"
                          variant="subtle"
                          aria-label="imprimir"
                          title="Imprimir"
                          onClick={() => window.print()}
                        >
                          <LuPrinter />
                        </IconButton>
                        <IconButton
                          size="xs"
                          colorPalette="pink"
                          variant="subtle"
                          aria-label="eliminar"
                          title="Eliminar"
                          onClick={() => setPendingDeleteId(p.id)}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </HStack>
                    </TD>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        <Flex px={3} pb={4} gap={1}>
          {["«", "1", "2", "3", "»"].map((p) => (
            <Button key={p} size="xs" variant={p === "1" ? "solid" : "outline"} colorPalette="teal">
              {p}
            </Button>
          ))}
        </Flex>
      </Card>

      <Flex justify="center" py={2}>
        <Text fontSize="xs" color="gray.400">M&amp;C IT Solutions — Panel de Administración</Text>
      </Flex>

      <DeleteConfirmDialog
        open={pendingDeleteId !== null}
        title="Eliminar proyecto"
        description={`¿Confirmás que querés eliminar el proyecto N° ${pendingProyecto?.nro ?? ""}? Esta acción no se puede deshacer.`}
        onConfirm={() => { onDelete(pendingDeleteId!); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Stack>
  );
};

// ─── Detail view ──────────────────────────────────────────────────────────────
const DetailView = ({
  proyecto,
  onBack,
  onUpdate,
}: {
  proyecto: Proyecto;
  onBack: () => void;
  onUpdate: (p: Proyecto) => void;
}) => {
  const [notificar, setNotificar] = React.useState(false);
  const [sector, setSector] = React.useState(proyecto.sector);
  const [descripcion, setDescripcion] = React.useState(proyecto.descripcion);
  const [ordenes, setOrdenes] = React.useState<OrdenItem[]>(proyecto.ordenes);

  // dialog agregar orden
  const [addOpen, setAddOpen] = React.useState(false);
  const [pendingDeleteNro, setPendingDeleteNro] = React.useState<string | null>(null);
  const [newNro, setNewNro] = React.useState("");
  const [newProducto, setNewProducto] = React.useState("");
  const [newTamano, setNewTamano] = React.useState("");
  const [newTerminacion, setNewTerminacion] = React.useState("");
  const [newPrecio, setNewPrecio] = React.useState("");
  const [newEstado, setNewEstado] = React.useState<OrdenEstado>("pendiente");

  const totalOrdenes = ordenes.reduce((s, o) => s + o.precio, 0);

  const handleAddOrden = () => {
    if (!newNro || !newProducto) return;
    setOrdenes((prev) => [
      ...prev,
      {
        nro: newNro,
        producto: newProducto,
        tamano: newTamano,
        terminacion: newTerminacion,
        precio: Number(newPrecio) || 0,
        estado: newEstado,
      },
    ]);
    setNewNro(""); setNewProducto(""); setNewTamano("");
    setNewTerminacion(""); setNewPrecio(""); setNewEstado("pendiente");
    setAddOpen(false);
  };

  const handleDeleteOrden = (nro: string) => {
    setOrdenes((prev) => prev.filter((o) => o.nro !== nro));
    setPendingDeleteNro(null);
  };

  return (
    <Stack gap={0} minH="100vh" bg="gray.50">
      {/* ── Top bar ── */}
      <Flex bg="teal.600" color="white" px={6} py={3} align="center" justify="space-between" gap={4}>
        <HStack gap={3}>
          <IconButton
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "teal.700" }}
            aria-label="Volver"
            onClick={onBack}
          >
            <LuArrowLeft />
          </IconButton>
          <Box>
            <Text fontWeight="bold" fontSize="lg">Ver proyecto</Text>
            <Text fontSize="xs" opacity={0.85}>Módulo de proyectos</Text>
          </Box>
        </HStack>
        <HStack gap={2}>
          <Button
            size="sm"
            bg="yellow.400"
            color="gray.900"
            _hover={{ bg: "yellow.500" }}
            onClick={() => window.print()}
          >
            <LuPrinter /> Imprimir
          </Button>
          <Button
            size="sm"
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={() => setAddOpen(true)}
          >
            <LuPlus /> Agregar orden
          </Button>
        </HStack>
      </Flex>

      <Stack gap={5} p={5}>
        {/* ── Project header card ── */}
        <Card>
          <SectionHeader>Información del proyecto</SectionHeader>
          <Box p={5}>
            <Flex gap={6} wrap="wrap" align="flex-start">
              {/* Número grande */}
              <Box>
                <Text fontSize="xs" color="gray.400" textTransform="uppercase" letterSpacing="wide" mb={1}>
                  N° Proyecto
                </Text>
                <Text fontSize="5xl" fontWeight="extrabold" color="teal.600" lineHeight="1">
                  {proyecto.nro}
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>{proyecto.cliente}</Text>
              </Box>

              {/* Campos */}
              <Stack gap={4} flex="1" minW="260px">
                <Checkbox.Root
                  checked={notificar}
                  onCheckedChange={(e) => setNotificar(!!e.checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" fontWeight="medium">
                    Notificar al cliente
                  </Checkbox.Label>
                </Checkbox.Root>

                <Box maxW="280px">
                  <Select
                    label="Seleccionar sector"
                    options={SECTOR_OPTS}
                    value={sector}
                    onChange={setSector}
                    placeholder="Seleccioná un sector..."
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={1}>
                    Descripción del proyecto
                  </Text>
                  <Textarea
                    size="sm"
                    rows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción general del proyecto..."
                  />
                </Box>
              </Stack>

              {/* Resumen */}
              <Stack gap={2} minW="180px">
                <Box bg="teal.50" borderRadius="md" p={3}>
                  <Text fontSize="xs" color="gray.500" mb={1}>Total órdenes</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.700">
                    {ordenes.length}
                  </Text>
                </Box>
                <Box bg="gray.50" borderRadius="md" p={3}>
                  <Text fontSize="xs" color="gray.500" mb={1}>Total estimado</Text>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    $ {totalOrdenes.toLocaleString("es-AR")}
                  </Text>
                </Box>
                <Button size="sm" colorPalette="teal" onClick={() => onUpdate({ ...proyecto, sector, descripcion, ordenes })}>
                  Guardar cambios
                </Button>
              </Stack>
            </Flex>
          </Box>
        </Card>

        {/* ── Orders table ── */}
        <Card>
          <SectionHeader
            actions={
              <Button
                size="xs"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.600"
                _hover={{ bg: "teal.600" }}
                onClick={() => setAddOpen(true)}
              >
                <LuPlus /> Nueva orden
              </Button>
            }
          >
            Órdenes del proyecto
          </SectionHeader>

          <Box overflowX="auto">
            <Box as="table" w="100%" style={{ borderCollapse: "collapse" }}>
              <Box as="thead">
                <Box as="tr">
                  <TH>N° Orden</TH>
                  <TH>Producto</TH>
                  <TH>Tamaño</TH>
                  <TH>Terminación</TH>
                  <TH right>Precio</TH>
                  <TH>Estado</TH>
                  <TH>Acciones</TH>
                </Box>
              </Box>
              <Box as="tbody">
                {ordenes.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#a0aec0", fontSize: "0.875rem" }}>
                      Sin órdenes en este proyecto
                    </td>
                  </tr>
                ) : (
                  ordenes.map((o) => (
                    <Box key={o.nro} as="tr" _hover={{ bg: "gray.50" }}>
                      <TD>
                        <Text fontWeight="semibold" color="teal.600">{o.nro}</Text>
                      </TD>
                      <TD>{o.producto}</TD>
                      <TD>{o.tamano}</TD>
                      <TD>{o.terminacion}</TD>
                      <TD right>
                        <Text fontWeight="medium">$ {o.precio.toLocaleString("es-AR")}</Text>
                      </TD>
                      <TD>
                        <Tag.Root size="sm" colorPalette={ESTADO_COLOR[o.estado]} variant="subtle">
                          <Tag.Label>{ESTADO_LABEL[o.estado]}</Tag.Label>
                        </Tag.Root>
                      </TD>
                      <TD>
                        <HStack gap={1}>
                          <IconButton size="xs" colorPalette="teal" variant="subtle" aria-label="editar">
                            <LuPencil />
                          </IconButton>
                          <IconButton size="xs" colorPalette="yellow" variant="subtle" aria-label="imprimir" onClick={() => window.print()}>
                            <LuPrinter />
                          </IconButton>
                          <IconButton
                            size="xs"
                            colorPalette="pink"
                            variant="subtle"
                            aria-label="eliminar"
                            onClick={() => setPendingDeleteNro(o.nro)}
                          >
                            <LuX />
                          </IconButton>
                        </HStack>
                      </TD>
                    </Box>
                  ))
                )}
              </Box>
              {ordenes.length > 0 && (
                <Box as="tfoot">
                  <tr style={{ background: "#f7fafc", borderTop: "2px solid #e2e8f0" }}>
                    <td colSpan={4} style={{ padding: "8px 16px", textAlign: "right", fontWeight: "bold", fontSize: "0.875rem" }}>
                      Total:
                    </td>
                    <td style={{ padding: "8px 16px", textAlign: "right", fontWeight: "bold", color: "#2c7a7b" }}>
                      $ {totalOrdenes.toLocaleString("es-AR")}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </Box>
              )}
            </Box>
          </Box>
        </Card>

        {/* ── Footer ── */}
        <Flex justify="center" py={4}>
          <Text fontSize="xs" color="gray.400">M&amp;C IT Solutions — Panel de Administración</Text>
        </Flex>
      </Stack>

      {/* ── Dialog eliminar orden ── */}
      <DeleteConfirmDialog
        open={pendingDeleteNro !== null}
        title="Eliminar orden"
        description={`¿Confirmás que querés eliminar la orden N° ${pendingDeleteNro ?? ""} del proyecto? Esta acción no se puede deshacer.`}
        onConfirm={() => handleDeleteOrden(pendingDeleteNro!)}
        onCancel={() => setPendingDeleteNro(null)}
      />

      {/* ── Dialog agregar orden ── */}
      <Dialog.Root open={addOpen} onOpenChange={(e) => setAddOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Agregar orden al proyecto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={3}>
                  <HStack gap={3}>
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>N° Orden</Text>
                      <Input size="sm" placeholder="94999" value={newNro} onChange={(e) => setNewNro(e.target.value)} />
                    </Box>
                    <Box flex="2">
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>Producto</Text>
                      <Input size="sm" placeholder="Flyer A5" value={newProducto} onChange={(e) => setNewProducto(e.target.value)} />
                    </Box>
                  </HStack>
                  <HStack gap={3}>
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>Tamaño</Text>
                      <Input size="sm" placeholder="A4" value={newTamano} onChange={(e) => setNewTamano(e.target.value)} />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>Terminación</Text>
                      <Input size="sm" placeholder="Sin terminación" value={newTerminacion} onChange={(e) => setNewTerminacion(e.target.value)} />
                    </Box>
                  </HStack>
                  <HStack gap={3}>
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>Precio</Text>
                      <Input size="sm" type="number" placeholder="0" value={newPrecio} onChange={(e) => setNewPrecio(e.target.value)} />
                    </Box>
                    <Box flex="2">
                      <Select
                        label="Estado"
                        options={Object.entries(ESTADO_LABEL).map(([v, l]) => ({ value: v, label: l }))}
                        value={newEstado}
                        onChange={(v) => setNewEstado(v as OrdenEstado)}
                      />
                    </Box>
                  </HStack>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
                <Button colorPalette="blue" onClick={handleAddOrden} disabled={!newNro || !newProducto}>
                  Agregar orden
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────
const ProyectosAdminPage: React.FC = () => {
  const [proyectos, setProyectos] = React.useState<Proyecto[]>(MOCK_PROYECTOS);
  const [selected, setSelected] = React.useState<Proyecto | null>(null);

  const handleDelete = (id: number) => {
    setProyectos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (updated: Proyecto) => {
    setProyectos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelected(updated);
  };

  if (selected) {
    return (
      <DetailView
        proyecto={selected}
        onBack={() => setSelected(null)}
        onUpdate={handleUpdate}
      />
    );
  }

  return (
    <ListView
      proyectos={proyectos}
      onDetail={setSelected}
      onDelete={handleDelete}
    />
  );
};

export default ProyectosAdminPage;
