import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CustomerAuthOtpPage = lazy(() => import("./pages/otp"));
const CustomerAuthRegisterPage = lazy(() => import("./pages/register"));

function CustomerAuth() {
  return (
    <Routes>
      <Route index element={<CustomerAuthOtpPage />} />
      <Route path="register" element={<CustomerAuthRegisterPage />} />
    </Routes>
  );
}

export default CustomerAuth;
