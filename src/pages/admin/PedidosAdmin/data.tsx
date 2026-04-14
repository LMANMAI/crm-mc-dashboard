import { Tag } from "@chakra-ui/react";

export const monthOptions = [
  { label: 'Agosto', value: '08' },
  { label: 'Julio', value: '07' },
  { label: 'Junio', value: '06' },
];

export const yearOptions = [
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
];

export const estadoTags = {
  pendiente: (
    <Tag.Root size="sm" colorPalette="yellow"><Tag.Label>1. Pendiente</Tag.Label></Tag.Root>
  ),
  paraEntregar: (
    <Tag.Root size="sm" colorPalette="blue"><Tag.Label>7. Para Entregar</Tag.Label></Tag.Root>
  ),
  terminaciones: (
    <Tag.Root size="sm" colorPalette="gray"><Tag.Label>5. Terminaciones</Tag.Label></Tag.Root>
  ),
  entregado: (
    <Tag.Root size="sm" colorPalette="green"><Tag.Label>Entregado</Tag.Label></Tag.Root>
  ),
};

export type PedidoRow = {
  id: number;
  nro: string;
  fecha: string;
  cliente: string;
  titulo: string;
  producto: string;
  color: string;
  medida: string;
  cant: string;
  precio: string;
  estado: keyof typeof estadoTags;
  medioPago: string;
  facturado: string;
};

export const initialRows: PedidoRow[] = [
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

export const columns = [
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
