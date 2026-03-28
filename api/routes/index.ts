import { Router } from 'express';
import { getHealth } from '../health.controller';
import pedidosRouter from '../pedidos/pedidos.routes';
import clientesRouter from '../clientes/clientes.routes';
import usuariosRouter from '../usuarios/usuarios.routes';
import productosRouter from '../productos/productos.routes';

const router = Router();

// Health Check
router.get('/health', getHealth);

// Rutas de los módulos
router.use('/pedidos', pedidosRouter);
router.use('/clientes', clientesRouter);
router.use('/usuarios', usuariosRouter);
router.use('/productos', productosRouter);

export default router;
