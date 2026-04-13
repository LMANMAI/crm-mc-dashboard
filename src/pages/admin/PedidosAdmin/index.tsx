import React from 'react';
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  HStack,
  Input,
  Portal,
  Stack,
  Tag,
  Text,
  Menu,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Select, Table } from '../../../components';
import { toaster } from '../../../components/ui/toaster';

const monthOptions = [
  { label: 'Agosto', value: '08' },
  { label: 'Julio', value: '07' },
  { label: 'Junio', value: '06' },
];

const yearOptions = [
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
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
  entregado: (
    <Tag.Root size="sm" colorPalette="green">
      <Tag.Label>Entregado</Tag.Label>
    </Tag.Root>
  ),
};

const initialRows = [
  {
    id: 1,
    nro: '85041',
    fecha: '19/08/2025',
    cliente: 'Octavio Felic',
    titulo: 'Sticker Troquelado',
    producto: 'Bajada Laser B&N',
    color: 'MyF',
    medida: '21x29.7',
    cant: '1.00',
    precio: '$ 1.980,00',
    estado: 'paraEntregar',
    medioPago: '-',
    facturado: '$0',
  },
  {
    id: 2,
    nro: '85039',
    fecha: '19/08/2025',
    cliente: 'Morph (f)',
    titulo: 'Talonarios duplicado',
    producto: 'Bajada Laser Color',
    color: 'Full color frente',
    medida: '29x40',
    cant: '2.00',
    precio: '$ 6.990,00',
    estado: 'terminaciones',
    medioPago: '-',
    facturado: '$0',
  },
];

const columns = [
  { header: 'Sel.', accessor: 'sel' },
  { header: 'Nro', accessor: 'nro' },
  { header: 'Fecha', accessor: 'fecha' },
  { header: 'Cliente', accessor: 'cliente' },
  { header: 'Título', accessor: 'titulo' },
  { header: 'Producto', accessor: 'producto' },
  { header: 'Color', accessor: 'color' },
  { header: 'Medida', accessor: 'medida' },
  { header: 'Cant.', accessor: 'cant', textAlign: 'right' as const },
  { header: 'Precio', accessor: 'precio', textAlign: 'right' as const },
  { header: 'Estado', accessor: 'estado', textAlign: 'center' as const },
  { header: 'Medio de pago', accessor: 'medioPago', textAlign: 'center' as const },
  { header: 'Facturado', accessor: 'facturado', textAlign: 'right' as const },
  { header: '', accessor: 'acciones', textAlign: 'center' as const },
];

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <Box bg="teal.500" color="white" fontWeight="semibold" fontSize="sm" px="3" py="2" rounded="md">
    {children}
  </Box>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box borderWidth="1px" rounded="md" bg="white" overflow="hidden">
    {children}
  </Box>
);

const PedidosAdminPage = () => {
  const [month, setMonth] = React.useState('08');
  const [year, setYear] = React.useState('2025');
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogStep, setDialogStep] = React.useState<'confirm' | 'success'>('confirm');
  const [isLoading, setIsLoading] = React.useState(false);
  const [pendingIds, setPendingIds] = React.useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openDeliverDialog = (ids: number[]) => {
    if (ids.length === 0) {
      toaster.create({
        title: 'Sin selección',
        description: 'Seleccioná al menos un pedido.',
        type: 'warning',
      });
      return;
    }
    setPendingIds(ids);
    setDialogStep('confirm');
    setDialogOpen(true);
  };

  const handleConfirmDeliver = async () => {
    setIsLoading(true);
    // Simula llamada a API
    await new Promise((res) => setTimeout(res, 800));
    setRows((prev) =>
      prev.map((r) =>
        pendingIds.includes(r.id) ? { ...r, estado: 'entregado' } : r
      )
    );
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
    estado: estados[r.estado as keyof typeof estados],
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
          <Button size="xs" colorPalette="blue">Acciones</Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="preview">Previsualizar</Menu.Item>
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
    <Stack px={4} py={6} maxW="1400px" mx="auto" gap={6}>
      {/* Exportar */}
      <Card>
        <SectionHeader>Exportar</SectionHeader>
        <Flex gap={3} p={3} align="center" wrap="wrap">
          <Select options={monthOptions} value={month} onChange={setMonth} multiple={false} />
          <Select options={yearOptions} value={year} onChange={setYear} multiple={false} />
          <Button size="sm" colorPalette="green">Exportar</Button>
        </Flex>
      </Card>

      {/* Filtros */}
      <Card>
        <SectionHeader>Filtros</SectionHeader>
        <Stack p={3} gap={3}>
          <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr 1fr' }} gap={3}>
            <Input placeholder="Número" size="sm" />
            <Select
              options={[
                { label: 'Seleccione un cliente', value: '' },
                { label: 'Morph (f)', value: 'morph' },
                { label: 'Octavio Felic', value: 'octavio' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
            <Select
              options={[
                { label: 'Seleccione una terminación', value: '' },
                { label: 'Anillado', value: 'anillado' },
                { label: 'Laminado', value: 'laminado' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
          </Grid>
          <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr 1fr' }} gap={3}>
            <Input placeholder="Estado" size="sm" />
            <Select
              options={[
                { label: 'Seleccione un producto', value: '' },
                { label: 'Bajada Laser B&N', value: 'bn' },
                { label: 'Bajada Laser Color', value: 'color' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
            <Select
              options={[
                { label: 'Seleccione un sector', value: '' },
                { label: 'Impresión', value: 'impresion' },
                { label: 'Terminaciones', value: 'terminaciones' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
          </Grid>
          <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr 1fr 1fr' }} gap={3}>
            <Select
              options={[
                { label: 'Filtrar por papel', value: '' },
                { label: 'Ilustración 170g', value: 'il170' },
                { label: 'Obra 80g', value: 'obra80' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
            <Select
              options={[
                { label: 'Seleccione un usuario', value: '' },
                { label: 'Carlos', value: 'carlos' },
                { label: 'Lucía', value: 'lucia' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
            <Input type="date" size="sm" />
            <Input type="date" size="sm" />
          </Grid>
          <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr 1fr' }} gap={3}>
            <Select
              options={[
                { label: 'Seleccione un color', value: '' },
                { label: 'B&N', value: 'bn' },
                { label: 'Full Color', value: 'cmky' },
              ]}
              value={''} onChange={() => {}} multiple={false}
            />
            <Input placeholder="Cantidad" size="sm" />
            <HStack justify="flex-end" gap={3}>
              <Button size="sm" colorPalette="blue">Aplicar</Button>
              <Button size="sm">Exportar filtrados</Button>
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
                <Button size="sm" variant="subtle">Acciones masivas</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="mark-delivered" onClick={() => openDeliverDialog(selectedIds)}>
                      Marcar como entregado
                    </Menu.Item>
                    <Menu.Item value="delete">Eliminar seleccionados</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Button size="sm" colorPalette="blue">Nuevo pedido</Button>
          </HStack>
          <HStack>
            <Input
              size="sm"
              placeholder="Buscar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={{ base: '200px', md: '260px' }}
            />
          </HStack>
        </Flex>
        <Box px={3} pb={3} overflowX="auto">
          <Table data={tableData} columns={columns} rowKey="id" />
        </Box>
        <Flex px={3} pb={3} gap={1}>
          {['<<', '<', '1', '2', '3', '>', '>>'].map((p) => (
            <Button key={p} size="xs" variant={p === '1' ? 'solid' : 'outline'}>{p}</Button>
          ))}
        </Flex>
      </Card>

      {/* Dialog: Marcar como entregado */}
      <Dialog.Root open={dialogOpen} onOpenChange={(e) => { if (!e.open) handleCloseDialog(); }}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              {dialogStep === 'confirm' ? (
                <>
                  <Dialog.Header>
                    <Dialog.Title>Marcar como entregado</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Stack gap={3}>
                      <Text fontSize="sm" color="gray.600">
                        Confirmá que los siguientes pedidos fueron entregados:
                      </Text>
                      <Stack gap={2}>
                        {pendingRows.map((r) => (
                          <Box
                            key={r.id}
                            borderWidth="1px"
                            borderRadius="md"
                            px={3}
                            py={2}
                          >
                            <HStack justify="space-between">
                              <Stack gap={0}>
                                <Text fontSize="sm" fontWeight="medium">
                                  #{r.nro} — {r.cliente}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {r.titulo} · {r.producto}
                                </Text>
                              </Stack>
                              <Text fontSize="sm" fontWeight="semibold" color="teal.600">
                                {r.precio}
                              </Text>
                            </HStack>
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <HStack gap={2}>
                      <Button
                        colorPalette="teal"
                        size="sm"
                        loading={isLoading}
                        onClick={handleConfirmDeliver}
                      >
                        CONFIRMAR ENTREGA
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleCloseDialog} disabled={isLoading}>
                        CANCELAR
                      </Button>
                    </HStack>
                  </Dialog.Footer>
                </>
              ) : (
                <>
                  <Dialog.Body py={8}>
                    <Stack gap={4} align="center" textAlign="center">
                      <Box color="teal.500" fontSize="4xl">
                        <FaCheckCircle />
                      </Box>
                      <Stack gap={1}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                          {pendingRows.length === 1
                            ? '¡Pedido marcado como entregado!'
                            : `¡${pendingRows.length} pedidos marcados como entregados!`}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          El estado fue actualizado correctamente.
                        </Text>
                      </Stack>
                      <Stack gap={1} w="full">
                        {pendingRows.map((r) => (
                          <HStack key={r.id} justify="space-between" px={2}>
                            <Text fontSize="sm" color="gray.600">#{r.nro} — {r.cliente}</Text>
                            <Tag.Root size="sm" colorPalette="green">
                              <Tag.Label>Entregado</Tag.Label>
                            </Tag.Root>
                          </HStack>
                        ))}
                      </Stack>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer justifyContent="center">
                    <Button colorPalette="teal" size="sm" onClick={handleCloseDialog}>
                      CERRAR
                    </Button>
                  </Dialog.Footer>
                </>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default PedidosAdminPage;
