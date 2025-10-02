import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

type Rol = "user_admin" | "user_empleado" | "user_cliente";

export default function RoleRoute({ allow }: { allow: Rol[] }) {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return <Navigate to="/auth" replace />;

  if (!allow.includes(user.rol as Rol)) return <Navigate to="/" replace />;

  return <Outlet />;
}
