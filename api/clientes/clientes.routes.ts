import { Router } from 'express';
import { getClientes, getClienteById } from './clientes.controller';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);

export default router;
