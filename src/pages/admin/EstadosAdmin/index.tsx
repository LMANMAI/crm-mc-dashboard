import React from "react";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { Table } from "../../../components";
import AdminPageToolbar from "../../../components/AdminPageToolbar";
import ColorSwatch from "./components/ColorSwatch";
import EstadoRowActions from "./components/EstadoRowActions";
import { MOCK_ESTADOS, type EstadoRow } from "./data";

const columns = [
  { header: "Nombre", accessor: "nombre" as const },
  { header: "Color", accessor: "color" as const },
  { header: "Tipo", accessor: "tipo" as const },
  { header: "Inicial", accessor: "inicial" as const, textAlign: "center" as const },
  { header: "Inicial tienda", accessor: "inicialTienda" as const, textAlign: "center" as const },
  { header: "Aplica a Cta Cte", accessor: "aplicaCtaCte" as const, textAlign: "center" as const },
  { header: "", accessor: "acciones" as const, textAlign: "center" as const },
];

const EstadosAdminPage = () => {
  const [rows, setRows] = React.useState<EstadoRow[]>(MOCK_ESTADOS);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.nombre.toLowerCase().includes(q));
  }, [rows, search]);

  const handleNuevo = () => console.log("Nuevo estado");
  const handleEditar = (row: EstadoRow) => console.log("Editar", row);
  const handleEliminar = (row: EstadoRow) =>
    setRows((prev) => prev.filter((r) => r.id !== row.id));

  const data = React.useMemo(
    () =>
      filtered.map((r) => ({
        id: r.id,
        nombre: r.nombre,
        color: <ColorSwatch hex={r.colorHex} />,
        tipo: r.tipo,
        inicial: r.inicial ? "Sí" : "No",
        inicialTienda: r.inicialTienda ? "Sí" : "No",
        aplicaCtaCte: r.aplicaCtaCte ? "Sí" : "No",
        acciones: (
          <EstadoRowActions
            row={r}
            onEdit={handleEditar}
            onDelete={handleEliminar}
          />
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtered]
  );

  return (
    <Stack gap={4}>
      <AdminPageToolbar
        title="Estados"
        searchValue={search}
        onSearchChange={setSearch}
        onNewClick={handleNuevo}
      />

      <Box borderWidth="1px" borderColor="gray.200" rounded="md" overflow="hidden">
        <Table data={data} columns={columns} rowKey="id" size="sm" />
        <Box bg="gray.200" px={4} py={3}>
          <HStack gap={2}>
            <Button size="xs" variant="subtle">«</Button>
            <Button size="xs" variant="solid" colorPalette="teal">1</Button>
            <Button size="xs" variant="subtle">»</Button>
          </HStack>
        </Box>
      </Box>
    </Stack>
  );
};

export default EstadosAdminPage;
