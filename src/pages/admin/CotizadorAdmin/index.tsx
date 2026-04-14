import React, { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Portal,
  Stack,
  Table,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  LuPlus,
  LuSave,
  LuTrash2,
  LuFilePen,
  LuSearch,
  LuBold,
  LuItalic,
  LuUnderline,
  LuList,
  LuListOrdered,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
} from "react-icons/lu";

// ─── types ────────────────────────────────────────────────────────────────────
interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
}

type GenericItem = { id: number;[key: string]: any };

// ─── mock backend response ────────────────────────────────────────────────────
const MOCK_BACKEND = {
  config: {
    cotizacionDolar: "1240",
    gananciaPorImpresion: "10",
    cantidadMinima: "1",
    mensajeCompra: "¡Gracias por tu compra! Podés abonar por Mercado Pago, transferencia bancaria o efectivo.",
  },
  valoresClick: [
    { id: 1, nombre: "Blanco & Negro A4", costo: "12.50" },
    { id: 2, nombre: "Blanco & Negro A3", costo: "21.90" },
    { id: 3, nombre: "Color A4", costo: "39.50" },
    { id: 4, nombre: "Color A3", costo: "81.00" },
  ],
  productos: [
    { id: 1, nombre: "Anillados", descripcion: "Ideal para apuntes, catálogos y blocks.", pliegos: "1 a 50 / 51 a 100 / 101 a 200" },
    { id: 2, nombre: "Bajada Láser B&N", descripcion: "Servicio de láser B&N alta calidad.", pliegos: "Auto-calculado" },
    { id: 3, nombre: "Sticker troquelado", descripcion: "Impresión y corte a medida.", pliegos: "Auto-calculado" },
  ],
  papeles: [
    { id: 1, nombre: "Acuarelado Brillo c/ opal", grosor: "0.13" },
    { id: 2, nombre: "Ilustración Mate 170g", grosor: "0.20" },
    { id: 3, nombre: "Cartulina Blanca 250g", grosor: "0.45" },
  ],
  tamanios: [
    { id: 1, nombre: "A5", ancho: "14.8", alto: "21.0" },
    { id: 2, nombre: "A4", ancho: "21.0", alto: "29.7" },
    { id: 3, nombre: "A3", ancho: "29.7", alto: "42.0" },
    { id: 4, nombre: "Carta", ancho: "21.6", alto: "27.9" },
  ],
  cargos: [
    { id: 1, desde: "Menor a 9 pliegos", cargoMin: "8.0", porcentaje: "5" },
    { id: 2, desde: "10 a 20 pliegos", cargoMin: "5.0", porcentaje: "3" },
  ],
  terminaciones: [
    { id: 1, nombre: "1 línea de troquel corta", cargoMin: "3.0" },
    { id: 2, nombre: "2 líneas 0.60", cargoMin: "6.0" },
    { id: 3, nombre: "3 trazados", cargoMin: "9.0" },
  ],
  colores: [
    { id: 1, nombre: "Blanco & Negro frente (B/N)", ganancia: "10" },
    { id: 2, nombre: "Full color frente", ganancia: "20" },
    { id: 3, nombre: "Full color frente y dorso", ganancia: "35" },
  ],
};

// ─── helpers ──────────────────────────────────────────────────────────────────
const fmt$ = (val: string | number) => {
  const n = Number(val);
  if (isNaN(n)) return val;
  return `$ ${n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fmtPct = (val: string | number) => `${val}%`;

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
    <HStack px={3} py={2} justify="space-between" bg="#1abc9c" color="white">
      <Text fontWeight="semibold" fontSize="sm">{title}</Text>
      {right && <HStack gap={2}>{right}</HStack>}
    </HStack>
    <Box p={3}>{children}</Box>
  </Box>
);

// ─── Rich text editor ─────────────────────────────────────────────────────────
const RichTextEditor: React.FC<{ defaultValue?: string }> = ({ defaultValue }) => {
  const ref = useRef<HTMLDivElement>(null);
  const exec = (cmd: string) => { document.execCommand(cmd, false); ref.current?.focus(); };

  const tools = [
    { icon: <LuBold />, cmd: "bold" },
    { icon: <LuItalic />, cmd: "italic" },
    { icon: <LuUnderline />, cmd: "underline" },
    { icon: <LuList />, cmd: "insertUnorderedList" },
    { icon: <LuListOrdered />, cmd: "insertOrderedList" },
    { icon: <LuAlignLeft />, cmd: "justifyLeft" },
    { icon: <LuAlignCenter />, cmd: "justifyCenter" },
    { icon: <LuAlignRight />, cmd: "justifyRight" },
  ];

  return (
    <Stack gap={0}>
      <HStack
        wrap="wrap" gap={1} px={2} py={1}
        bg="gray.50" borderWidth="1px" borderColor="gray.200" roundedTop="md"
      >
        {tools.map(({ icon, cmd }, i) => (
          <IconButton key={i} size="xs" variant="ghost" aria-label={cmd} onClick={() => exec(cmd)}>
            {icon}
          </IconButton>
        ))}
      </HStack>
      <Box
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: defaultValue ?? "" }}
        minH="100px" p={3} fontSize="sm" outline="none"
        borderWidth="1px" borderTopWidth="0" borderColor="gray.200" roundedBottom="md"
        _focus={{ borderColor: "teal.400" }}
      />
    </Stack>
  );
};

// ─── CrudModal ────────────────────────────────────────────────────────────────
const CrudModal: React.FC<{
  open: boolean;
  title: string;
  fields: FieldDef[];
  initialValues?: Record<string, string>;
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
}> = ({ open, title, fields, initialValues, onClose, onSave }) => {
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (open) setValues(initialValues ?? {});
  }, [open, initialValues]);

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }));

  return (
    <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) onClose(); }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={3}>
                {fields.map((f) => (
                  <Field.Root key={f.key}>
                    <Field.Label fontSize="sm">{f.label}</Field.Label>
                    {f.type === "textarea" ? (
                      <Textarea
                        size="sm"
                        rows={3}
                        placeholder={f.placeholder}
                        value={values[f.key] ?? ""}
                        onChange={(e) => set(f.key, e.target.value)}
                      />
                    ) : (
                      <Input
                        size="sm"
                        type={f.type === "number" ? "number" : "text"}
                        placeholder={f.placeholder}
                        value={values[f.key] ?? ""}
                        onChange={(e) => set(f.key, e.target.value)}
                      />
                    )}
                  </Field.Root>
                ))}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button colorPalette="teal" onClick={() => onSave(values)}>
                Guardar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// ─── DeleteDialog ─────────────────────────────────────────────────────────────
const DeleteDialog: React.FC<{
  open: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ open, itemName, onConfirm, onCancel }) => (
  <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) onCancel(); }}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirmar eliminación</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text fontSize="sm" color="gray.600">
              ¿Confirmás que querés eliminar{itemName ? ` "${itemName}"` : " este elemento"}?
              Esta acción no se puede deshacer.
            </Text>
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

// ─── DynamicSection ───────────────────────────────────────────────────────────
const PAGE_SIZE = 5;

const DynamicSection: React.FC<{
  title: string;
  cols: string[];
  fields: FieldDef[];
  items: GenericItem[];
  getRow: (item: GenericItem) => React.ReactNode[];
  getLabel: (item: GenericItem) => string;
  itemToValues: (item: GenericItem) => Record<string, string>;
  valuestoItem: (id: number, values: Record<string, string>) => GenericItem;
  onCreate: (values: Record<string, string>) => void;
  onUpdate: (id: number, values: Record<string, string>) => void;
  onDelete: (id: number) => void;
  gridSpan?: number;
}> = ({
  title, cols, fields, items,
  getRow, getLabel, itemToValues, onCreate, onUpdate, onDelete,
}) => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<GenericItem | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const filtered = items.filter((item) =>
    getLabel(item).toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const deletingItem = items.find((i) => i.id === deleteId);

  const handleOpenNew = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (item: GenericItem) => { setEditingItem(item); setModalOpen(true); };
  const handleSave = (values: Record<string, string>) => {
    if (editingItem) onUpdate(editingItem.id, values);
    else onCreate(values);
    setModalOpen(false);
  };

  return (
    <>
      <Panel
        title={title}
        right={
          <>
            <HStack bg="whiteAlpha.200" rounded="md" px={2} py={0.5}>
              <Input
                size="xs"
                placeholder="Buscar…"
                border="none"
                color="white"
                _placeholder={{ color: "whiteAlpha.700" }}
                w="120px"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                outline="none"
                _focusVisible={{ boxShadow: "none" }}
              />
              <LuSearch size={12} />
            </HStack>
            <Button size="xs" colorPalette="teal" variant="solid" bg="white" color="teal.600"
              _hover={{ bg: "gray.100" }} onClick={handleOpenNew}>
              <LuPlus /> Nuevo
            </Button>
          </>
        }
      >
        <Table.Root size="sm" variant="line" w="100%">
          <Table.Header>
            <Table.Row bg="gray.50">
              {cols.map((c) => (
                <Table.ColumnHeader key={c} fontWeight="semibold" fontSize="xs"
                  textTransform="uppercase" color="gray.500" letterSpacing="wide">
                  {c}
                </Table.ColumnHeader>
              ))}
              <Table.ColumnHeader textAlign="right" fontWeight="semibold" fontSize="xs"
                textTransform="uppercase" color="gray.500" letterSpacing="wide">
                Acciones
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginated.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={cols.length + 1} textAlign="center" py={6} color="gray.400" fontSize="sm">
                  Sin resultados
                </Table.Cell>
              </Table.Row>
            ) : (
              paginated.map((item) => (
                <Table.Row key={item.id} _hover={{ bg: "gray.50" }}>
                  {getRow(item).map((cell, j) => (
                    <Table.Cell key={j} fontSize="sm">{cell}</Table.Cell>
                  ))}
                  <Table.Cell textAlign="right">
                    <HStack justify="end" gap={1}>
                      <IconButton size="xs" colorPalette="teal" variant="subtle"
                        aria-label="editar" onClick={() => handleOpenEdit(item)}>
                        <LuFilePen />
                      </IconButton>
                      <IconButton size="xs" colorPalette="pink" variant="subtle"
                        aria-label="eliminar" onClick={() => setDeleteId(item.id)}>
                        <LuTrash2 />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>

        {totalPages > 1 && (
          <HStack mt={2} gap={1}>
            <Button size="xs" variant="outline" disabled={page === 1} onClick={() => setPage(1)}>«</Button>
            <Button size="xs" variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} size="xs" variant={p === page ? "solid" : "outline"}
                colorPalette={p === page ? "teal" : undefined} onClick={() => setPage(p)}>
                {p}
              </Button>
            ))}
            <Button size="xs" variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>›</Button>
            <Button size="xs" variant="outline" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</Button>
          </HStack>
        )}
      </Panel>

      <CrudModal
        open={modalOpen}
        title={editingItem ? `Editar ${title.toLowerCase()}` : `Nuevo — ${title}`}
        fields={fields}
        initialValues={editingItem ? itemToValues(editingItem) : undefined}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteDialog
        open={deleteId !== null}
        itemName={deletingItem ? getLabel(deletingItem) : undefined}
        onConfirm={() => { onDelete(deleteId!); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────
const CotizadorAdminPage: React.FC = () => {
  const data = MOCK_BACKEND;

  // config
  const [cotizDolar, setCotizDolar] = React.useState(data.config.cotizacionDolar);
  const [ganancia, setGanancia] = React.useState(data.config.gananciaPorImpresion);
  const [cantMin, setCantMin] = React.useState(data.config.cantidadMinima);

  // section states
  const [valClick, setValClick] = React.useState(data.valoresClick);
  const [productos, setProductos] = React.useState(data.productos);
  const [papeles, setPapeles] = React.useState(data.papeles);
  const [tamanios, setTamanios] = React.useState(data.tamanios);
  const [cargos, setCargos] = React.useState(data.cargos);
  const [terminaciones, setTerminaciones] = React.useState(data.terminaciones);
  const [colores, setColores] = React.useState(data.colores);

  const nextId = (arr: GenericItem[]) => Math.max(0, ...arr.map((i) => i.id)) + 1;

  const makeHandlers = <T extends GenericItem>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    arr: T[]
  ) => ({
    onCreate: (v: Record<string, string>) =>
      setter((prev) => [...prev, { id: nextId(arr), ...v } as T]),
    onUpdate: (id: number, v: Record<string, string>) =>
      setter((prev) => prev.map((i) => (i.id === id ? { ...i, ...v } : i))),
    onDelete: (id: number) =>
      setter((prev) => prev.filter((i) => i.id !== id)),
  });

  const vcH = makeHandlers(setValClick, valClick);
  const prH = makeHandlers(setProductos, productos);
  const paH = makeHandlers(setPapeles, papeles);
  const taH = makeHandlers(setTamanios, tamanios);
  const caH = makeHandlers(setCargos, cargos);
  const teH = makeHandlers(setTerminaciones, terminaciones);
  const coH = makeHandlers(setColores, colores);

  return (
    <Box px={4} py={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
        Módulo de cotizaciones
      </Text>

      {/* ── Configuraciones generales ── */}
      <Panel
        title="Configuraciones generales"
        right={
          <Button size="xs" bg="white" color="teal.600" _hover={{ bg: "gray.100" }}>
            <LuSave /> Guardar
          </Button>
        }
      >
        <Stack gap={4}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={3}>
            <Field.Root>
              <Field.Label fontSize="sm">Cotización dólar</Field.Label>
              <Input size="sm" value={cotizDolar} onChange={(e) => setCotizDolar(e.target.value)}
                placeholder="1240" />
              <Field.HelperText fontSize="xs">{fmt$(cotizDolar)}</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label fontSize="sm">Ganancia por impresión</Field.Label>
              <Input size="sm" value={ganancia} onChange={(e) => setGanancia(e.target.value)}
                placeholder="10" />
              <Field.HelperText fontSize="xs">{fmtPct(ganancia)}</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label fontSize="sm">Cantidad mínima</Field.Label>
              <Input size="sm" type="number" value={cantMin}
                onChange={(e) => setCantMin(e.target.value)} placeholder="1" />
            </Field.Root>
          </Grid>

          <Field.Root>
            <Field.Label fontSize="sm">Mensaje de la compra</Field.Label>
            <RichTextEditor defaultValue={data.config.mensajeCompra} />
          </Field.Root>
        </Stack>
      </Panel>

      <Stack mt={4} gap={4}>
        {/* ── Valores por click ── */}
        <DynamicSection
          title="Valores por click"
          cols={["Nombre", "Costo"]}
          fields={[
            { key: "nombre", label: "Nombre", placeholder: "Blanco & Negro A4" },
            { key: "costo", label: "Costo", type: "number", placeholder: "0.00" },
          ]}
          items={valClick}
          getRow={(i) => [i.nombre, fmt$(i.costo)]}
          getLabel={(i) => i.nombre}
          itemToValues={(i) => ({ nombre: i.nombre, costo: i.costo })}
          valuestoItem={(id, v) => ({ id, ...v })}
          {...vcH}
        />

        {/* ── Productos ── */}
        <DynamicSection
          title="Productos"
          cols={["Nombre", "Descripción", "Pliegos"]}
          fields={[
            { key: "nombre", label: "Nombre", placeholder: "Anillados" },
            { key: "descripcion", label: "Descripción", type: "textarea", placeholder: "Descripción del producto…" },
            { key: "pliegos", label: "Pliegos", placeholder: "Auto-calculado" },
          ]}
          items={productos}
          getRow={(i) => [
            <Text fontWeight="medium" key="n">{i.nombre}</Text>,
            <Text fontSize="xs" color="gray.600" key="d">{i.descripcion}</Text>,
            i.pliegos,
          ]}
          getLabel={(i) => i.nombre}
          itemToValues={(i) => ({ nombre: i.nombre, descripcion: i.descripcion, pliegos: i.pliegos })}
          valuestoItem={(id, v) => ({ id, ...v })}
          {...prH}
        />

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          {/* ── Tipos de papeles ── */}
          <DynamicSection
            title="Tipos de papeles"
            cols={["Nombre", "Grosor"]}
            fields={[
              { key: "nombre", label: "Nombre", placeholder: "Ilustración Mate 170g" },
              { key: "grosor", label: "Grosor (mm)", type: "number", placeholder: "0.20" },
            ]}
            items={papeles}
            getRow={(i) => [i.nombre, i.grosor]}
            getLabel={(i) => i.nombre}
            itemToValues={(i) => ({ nombre: i.nombre, grosor: i.grosor })}
            valuestoItem={(id, v) => ({ id, ...v })}
            {...paH}
          />

          {/* ── Tamaños ── */}
          <DynamicSection
            title="Tamaños predefinidos"
            cols={["Nombre", "Ancho (cm)", "Alto (cm)"]}
            fields={[
              { key: "nombre", label: "Nombre", placeholder: "A4" },
              { key: "ancho", label: "Ancho (cm)", type: "number", placeholder: "21.0" },
              { key: "alto", label: "Alto (cm)", type: "number", placeholder: "29.7" },
            ]}
            items={tamanios}
            getRow={(i) => [i.nombre, i.ancho, i.alto]}
            getLabel={(i) => i.nombre}
            itemToValues={(i) => ({ nombre: i.nombre, ancho: i.ancho, alto: i.alto })}
            valuestoItem={(id, v) => ({ id, ...v })}
            {...taH}
          />

          {/* ── Cargos por pliegos ── */}
          <DynamicSection
            title="Cargos por pliegos"
            cols={["Desde", "Cargo mín.", "Porcentaje"]}
            fields={[
              { key: "desde", label: "Desde", placeholder: "Menor a 9 pliegos" },
              { key: "cargoMin", label: "Cargo mínimo", type: "number", placeholder: "8.0" },
              { key: "porcentaje", label: "Porcentaje", type: "number", placeholder: "5" },
            ]}
            items={cargos}
            getRow={(i) => [i.desde, fmt$(i.cargoMin), fmtPct(i.porcentaje)]}
            getLabel={(i) => i.desde}
            itemToValues={(i) => ({ desde: i.desde, cargoMin: i.cargoMin, porcentaje: i.porcentaje })}
            valuestoItem={(id, v) => ({ id, ...v })}
            {...caH}
          />

          {/* ── Terminaciones ── */}
          <DynamicSection
            title="Terminaciones"
            cols={["Nombre", "Cargo mín."]}
            fields={[
              { key: "nombre", label: "Nombre", placeholder: "1 línea de troquel" },
              { key: "cargoMin", label: "Cargo mínimo", type: "number", placeholder: "3.0" },
            ]}
            items={terminaciones}
            getRow={(i) => [i.nombre, fmt$(i.cargoMin)]}
            getLabel={(i) => i.nombre}
            itemToValues={(i) => ({ nombre: i.nombre, cargoMin: i.cargoMin })}
            valuestoItem={(id, v) => ({ id, ...v })}
            {...teH}
          />

          {/* ── Colores ── */}
          <DynamicSection
            title="Colores"
            cols={["Nombre", "Ganancia"]}
            fields={[
              { key: "nombre", label: "Nombre", placeholder: "Full color frente" },
              { key: "ganancia", label: "Ganancia (%)", type: "number", placeholder: "20" },
            ]}
            items={colores}
            getRow={(i) => [i.nombre, fmtPct(i.ganancia)]}
            getLabel={(i) => i.nombre}
            itemToValues={(i) => ({ nombre: i.nombre, ganancia: i.ganancia })}
            valuestoItem={(id, v) => ({ id, ...v })}
            {...coH}
          />
        </Grid>
      </Stack>

      <Flex justify="center" py={6}>
        <Text fontSize="xs" color="gray.400">M&amp;C IT Solutions — Panel de Administración</Text>
      </Flex>
    </Box>
  );
};

export default CotizadorAdminPage;
