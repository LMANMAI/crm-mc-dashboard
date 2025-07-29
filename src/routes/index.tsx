import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AuthPage, PedidosPage } from "../pages";
import AdminLayout from "../components/layout/AdminLayout";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedidos" element={<PedidosPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
