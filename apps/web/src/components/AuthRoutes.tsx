import { useAppStore } from "@/hooks";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
}
