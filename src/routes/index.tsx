import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AuthPage,
  PedidosClientePage,
  CuentaCorrienteCliente,
  ComprobantesPageCliente,
  PresupuestosPageCliente,
  ClienteScreen,
  DetailPage,
} from "../pages";
import AdminLayout from "../components/layout/AdminLayout";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedidos" element={<PedidosClientePage />} />
        <Route path="/cuenta-corriente" element={<CuentaCorrienteCliente />} />

        <Route path="/mis-datos" element={<ClienteScreen />} />
        <Route path="/presupuestos" element={<PresupuestosPageCliente />} />
        <Route path="/comprobantes" element={<ComprobantesPageCliente />} />
        <Route path="pedidos/:id" element={<DetailPage />} />
        <Route path="presupuestos/:id" element={<DetailPage />} />
        <Route path="comprobantes/:id" element={<DetailPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
