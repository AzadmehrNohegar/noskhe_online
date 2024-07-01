import { getPharmacyProfile } from "@/api/pharmacy";
import { getUserProfile } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { isAuthenticated, role } = useAuthStore();

  useQuery("user-profile", () => getUserProfile(), {
    enabled: isAuthenticated && role === "CUSTOMER",
  });

  useQuery("pharmacy-profile", () => getPharmacyProfile(), {
    enabled: isAuthenticated && role === "PHARMACY",
  });

  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <Outlet />;
}

export { PrivateRoute };
