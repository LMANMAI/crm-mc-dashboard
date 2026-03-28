import { Router } from 'express';
import { getPedidos, getPedidoById } from './pedidos.controller';

const router = Router();

router.get('/', getPedidos);
router.get('/:id', getPedidoById);

export default router;
