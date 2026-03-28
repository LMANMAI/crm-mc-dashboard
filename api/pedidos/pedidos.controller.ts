import { Request, Response } from 'express';

// Ejemplo: Obtener todos los pedidos
export const getPedidos = (req: Request, res: Response) => {
  res.json({ message: 'Obteniendo todos los pedidos' });
};

// Ejemplo: Obtener un pedido por ID
export const getPedidoById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Obteniendo el pedido con ID: ${id}` });
};
