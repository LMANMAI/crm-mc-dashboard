import { Request, Response } from 'express';

// Ejemplo: Obtener todos los productos
export const getProductos = (req: Request, res: Response) => {
  res.json({ message: 'Obteniendo todos los productos' });
};

// Ejemplo: Obtener un producto por ID
export const getProductoById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Obteniendo el producto con ID: ${id}` });
};
