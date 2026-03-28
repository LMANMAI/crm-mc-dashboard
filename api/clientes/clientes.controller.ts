import { Request, Response } from 'express';

// Ejemplo: Obtener todos los clientes
export const getClientes = (req: Request, res: Response) => {
  res.json({ message: 'Obteniendo todos los clientes' });
};

// Ejemplo: Obtener un cliente por ID
export const getClienteById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Obteniendo el cliente con ID: ${id}` });
};
