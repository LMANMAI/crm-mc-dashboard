import { Request, Response } from 'express';

// Ejemplo: Obtener todos los usuarios
export const getUsuarios = (req: Request, res: Response) => {
  res.json({ message: 'Obteniendo todos los usuarios' });
};

// Ejemplo: Obtener un usuario por ID
export const getUsuarioById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Obteniendo el usuario con ID: ${id}` });
};
