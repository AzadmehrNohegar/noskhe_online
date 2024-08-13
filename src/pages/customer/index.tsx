import { CustomerLayout } from "@/layouts/customerLayout";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("../auth"));

const WalletPage = lazy(() => import("./wallet"));
const OrderPage = lazy(() => import("./order"));
const DashboardPage = lazy(() => import("./dashboard"));
const ProfilePage = lazy(() => import("./profile"));
const InvoicePage = lazy(() => import("./invoice"));
const CallbackPage = lazy(() => import("./callback"));

function CustomerBasePage() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<CustomerLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="order/*" element={<OrderPage />} />
          <Route path="invoice/*" element={<InvoicePage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="callback" element={<CallbackPage />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<>not found</>} />
    </Routes>
  );
}

export default CustomerBasePage;
