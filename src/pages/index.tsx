import { DashboardLayout } from "@/layouts/dashboardLayout";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./auth"));

const CustomerWalletPage = lazy(() => import("./customer/wallet"));
const CustomerOrderPage = lazy(() => import("./customer/order"));
const CustomerDashboardPage = lazy(() => import("./customer/dashboard"));

function BasePage() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<CustomerDashboardPage />} />
          <Route path="order/*" element={<CustomerOrderPage />} />
          <Route path="wallet" element={<CustomerWalletPage />} />
          <Route path="*" element={<>gg</>} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
