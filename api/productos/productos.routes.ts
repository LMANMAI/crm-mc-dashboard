import { Router } from 'express';
import { getProductos, getProductoById } from './productos.controller';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);

export default router;
