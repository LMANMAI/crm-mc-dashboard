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
  CrearPedidoAdminPage,
  CajasAdminPage,
  ClientesAdminPage,
  ComprasAdminPage,
  ConfiguracionesAdminPage,
  CotizadorAdminPage,
  PedidosAdminPage,
  ProyectosAdminPage,
  ReportesAdminPage,
  StockAdminPage,
} from "../pages";
import AdminLayout from "../components/layout/AdminLayout";
import RoleRoute from "./RoleRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<AdminLayout />}>
        {/* CLIENTE */}
        <Route element={<RoleRoute allow={["user_cliente"]} />}>
          <Route path="/" element={<PedidosClientePage />} />
          <Route path="/pedidos" element={<PedidosClientePage />} />
          <Route
            path="/cuenta-corriente"
            element={<CuentaCorrienteCliente />}
          />
          <Route path="/mis-datos" element={<ClienteScreen />} />
          <Route path="/presupuestos" element={<PresupuestosPageCliente />} />
          <Route path="/comprobantes" element={<ComprobantesPageCliente />} />
          <Route path="/pedidos/:id" element={<DetailPage />} />
          <Route path="/presupuestos/:id" element={<DetailPage />} />
          <Route path="/comprobantes/:id" element={<DetailPage />} />
        </Route>

        {/* ADMIN */}
        <Route element={<RoleRoute allow={["user_admin"]} />}>
          <Route path="/" element={<CrearPedidoAdminPage />} />
          <Route path="/crear-pedido" element={<CrearPedidoAdminPage />} />
          <Route path="/cotizador" element={<CotizadorAdminPage />} />
          <Route path="/pedidos-admin" element={<PedidosAdminPage />} />
          <Route path="/proyectos" element={<ProyectosAdminPage />} />
          <Route path="/cajas" element={<CajasAdminPage />} />
          <Route path="/compras" element={<ComprasAdminPage />} />
          <Route path="/stock" element={<StockAdminPage />} />
          <Route path="/clientes" element={<ClientesAdminPage />} />
          <Route
            path="/configuraciones"
            element={<ConfiguracionesAdminPage />}
          />
          <Route path="/reportes" element={<ReportesAdminPage />} />
        </Route>
      </Route>

      {/* login */}
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
