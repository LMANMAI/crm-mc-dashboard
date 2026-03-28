import express from 'express';
import apiRouter from './routes';

const app = express();
const port = 3001; // Usamos un puerto diferente al de Vite y al del mock server

app.use(express.json());

// Loggear todas las peticiones
app.use('/api', (req, res, next) => {
  console.log(`[BFF] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`[BFF] Servidor BFF escuchando en http://localhost:${port}`);
});
