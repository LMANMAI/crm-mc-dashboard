import React from 'react';
import { Box, Button, Flex, HStack, Input, Menu, Portal, Stack } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Select, Table } from '../../../components';
import { toaster } from '../../../components/ui/toaster';
import { columns, estadoTags, initialRows, type PedidoRow } from './data';
import FiltersDrawer from './components/FiltersDrawer';
import DeliverDialog from './components/DeliverDialog';

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <Box bg="teal.500" color="white" fontWeight="semibold" fontSize="sm" px="3" py="2" roundedTop="md">
    {children}
  </Box>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" rounded="md" bg="white">
    {children}
  </Box>
);

const PedidosAdminPage = () => {
  const navigate = useNavigate();
  const [month, setMonth] = React.useState('08');
  const [year, setYear] = React.useState('2025');
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState<PedidoRow[]>(initialRows);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogStep, setDialogStep] = React.useState<'confirm' | 'success'>('confirm');
  const [isLoading, setIsLoading] = React.useState(false);
  const [pendingIds, setPendingIds] = React.useState<number[]>([]);

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const openDeliverDialog = (ids: number[]) => {
    if (ids.length === 0) {
      toaster.create({ title: 'Sin selección', description: 'Seleccioná al menos un pedido.', type: 'warning' });
      return;
    }
    setPendingIds(ids);
    setDialogStep('confirm');
    setDialogOpen(true);
  };

  const handleConfirmDeliver = async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setRows((prev) => prev.map((r) => pendingIds.includes(r.id) ? { ...r, estado: 'entregado' as const } : r));
    setSelectedIds([]);
    setIsLoading(false);
    setDialogStep('success');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogStep('confirm');
    setPendingIds([]);
  };

  const pendingRows = rows.filter((r) => pendingIds.includes(r.id));

  const tableData = rows.map((r) => ({
    ...r,
    estado: estadoTags[r.estado],
    sel: (
      <input
        type="checkbox"
        checked={selectedIds.includes(r.id)}
        onChange={() => toggleSelect(r.id)}
      />
    ),
    acciones: (
      <Menu.Root positioning={{ placement: 'bottom-end' }}>
        <Menu.Trigger asChild>
          <Button size="xs" colorPalette="teal">Acciones</Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="preview" onClick={() => navigate(`/pedidos-admin/${r.id}`, { state: { order: r } })}>Previsualizar</Menu.Item>
              <Menu.Item value="print">Imprimir</Menu.Item>
              <Menu.Item value="reprint">Reimprimir</Menu.Item>
              <Menu.Item value="mark-delivered" onClick={() => openDeliverDialog([r.id])}>
                Marcar como entregado
              </Menu.Item>
              <Menu.Item value="delete-order">Eliminar orden</Menu.Item>
              <Menu.Item value="delete-file">Eliminar archivo</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="mark-important">Marcar como importante</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    ),
  }));

  return (
    <Stack px={4} py={6} gap={6}>
      <Card>
        <SectionHeader>Todos los pedidos</SectionHeader>
        <Flex p={3} justify="space-between" gap={3} wrap="wrap">
          <HStack gap={2}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button size="sm" variant="subtle" colorPalette="teal">Acciones masivas</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="facturar-mascopies-burgueño">
                      A facturar con MASCOPIES - burgueño maria dolores
                    </Menu.Item>
                    <Menu.Item value="facturar-mascopies">
                      A facturar con Mas copies
                    </Menu.Item>
                    <Menu.Item value="a-proyecto">A proyecto</Menu.Item>
                    <Menu.Item value="cambiar-estado">Cambiar estado</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button size="sm" colorPalette="teal">Nuevo pedido</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="cotizador" onClick={() => navigate('/cotizador')}>
                      Cotizador
                    </Menu.Item>
                    <Menu.Item value="pedidos-simples" onClick={() => navigate('/pedidos-simples-admin')}>
                      Pedidos simples
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>
          <HStack gap={2}>
            <Input
              size="sm"
              placeholder="Buscar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={{ base: '160px', md: '240px' }}
            />
            <Button size="sm" variant="outline" colorPalette="teal" onClick={() => setDrawerOpen(true)}>
              <FaFilter /> Filtros
            </Button>
          </HStack>
        </Flex>
        <Box px={3} pb={3} overflowX="auto">
          <Table data={tableData} columns={columns} rowKey="id" minW="1200px" />
        </Box>
        <Flex px={3} pb={3} gap={1}>
          {['<<', '<', '1', '2', '3', '>', '>>'].map((p) => (
            <Button key={p} size="xs" variant={p === '1' ? 'solid' : 'outline'}>{p}</Button>
          ))}
        </Flex>
      </Card>

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />

      <DeliverDialog
        open={dialogOpen}
        step={dialogStep}
        isLoading={isLoading}
        pendingRows={pendingRows}
        onConfirm={handleConfirmDeliver}
        onClose={handleCloseDialog}
      />
    </Stack>
  );
};

export default PedidosAdminPage;
