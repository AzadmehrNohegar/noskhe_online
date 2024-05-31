import { getUserProfile } from "@/api/membership";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { isAuthenticated } = useAuthStore();

  useQuery("user-profile", () => getUserProfile(), {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <Outlet />;
}

export { PrivateRoute };
