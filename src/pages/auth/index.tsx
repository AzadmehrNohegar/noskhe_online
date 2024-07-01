import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CustomerAuthPage = lazy(() => import("./pages/customer"));
const PharmacyAuthPage = lazy(() => import("./pages/pharmacy"));

function Auth() {
  return (
    <Routes>
      <Route index element={<Navigate to="./customer" replace />} />
      <Route path="customer/*" element={<CustomerAuthPage />} />
      <Route path="pharmacy/*" element={<PharmacyAuthPage />} />
    </Routes>
  );
}

export default Auth;
