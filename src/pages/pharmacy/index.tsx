import { PharmacyLayout } from "@/layouts/pharmacyLayout";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("../auth"));

const DashboardPage = lazy(() => import("./dashboard"));
const NewOrderPage = lazy(() => import("./newOrder"));
const OrderPage = lazy(() => import("./order"));
const ProfilePage = lazy(() => import("./profile"));
const WalletPage = lazy(() => import("./wallet"));

function PharmacyBasePage() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<PharmacyLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="new-order/*" element={<NewOrderPage />} />
          <Route path="order/*" element={<OrderPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<>not found</>} />
    </Routes>
  );
}

export default PharmacyBasePage;
