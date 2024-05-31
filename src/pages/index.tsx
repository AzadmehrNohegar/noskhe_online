import { DashboardLayout } from "@/layouts/dashboardLayout";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardPage = lazy(() => import("./dashboard"));
const AuthPage = lazy(() => import("./auth"));
const WalletPage = lazy(() => import("./wallet"));
const PerscriptionPage = lazy(() => import("./prescription"));

function BasePage() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="prescription" element={<PerscriptionPage />} />
          <Route path="*" element={<>gg</>} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
