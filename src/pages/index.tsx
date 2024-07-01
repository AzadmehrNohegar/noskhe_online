import { CustomerLayout } from "@/layouts/customerLayout";
import { PharmacyLayout } from "@/layouts/pharmacyLayout";
import { PrivateRoute } from "@/shared/privateRoute";
import { useAuthStore } from "@/store/auth";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./auth"));

const CustomerWalletPage = lazy(() => import("./customer/wallet"));
const CustomerOrderPage = lazy(() => import("./customer/order"));
const CustomerDashboardPage = lazy(() => import("./customer/dashboard"));

const PharmacyDashboardPage = lazy(() => import("./pharmacy/dashboard"));

function BasePage() {
  const { role } = useAuthStore();

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {role === "CUSTOMER" ? (
          <Route element={<CustomerLayout />}>
            <Route index element={<CustomerDashboardPage />} />
            <Route path="order/*" element={<CustomerOrderPage />} />
            <Route path="wallet" element={<CustomerWalletPage />} />
            <Route path="*" element={<>gg</>} />
          </Route>
        ) : null}
      </Route>
      {role === "PHARMACY" ? (
        <Route element={<PharmacyLayout />}>
          <Route index element={<PharmacyDashboardPage />} />
        </Route>
      ) : null}
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
