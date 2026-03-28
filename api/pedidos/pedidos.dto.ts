export interface PedidoDTO {
  id: string;
  clienteId: string;
  productos: { productoId: string; cantidad: number }[];
  estado: 'pendiente' | 'en-proceso' | 'completado';
}
