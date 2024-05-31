import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthForgetPassPage = lazy(() => import("./pages/forgetPass"));
const AuthOtpPage = lazy(() => import("./pages/otp"));
const AuthRegisterPage = lazy(() => import("./pages/register"));

function Auth() {
  return (
    <Routes>
      <Route index element={<AuthOtpPage />} />
      <Route path="forget-password" element={<AuthForgetPassPage />} />
      <Route path="register" element={<AuthRegisterPage />} />
    </Routes>
  );
}

export default Auth;
