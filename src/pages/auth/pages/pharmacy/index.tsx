import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PharmacyAuthLoginPage = lazy(() => import("./pages/login"));

function CustomerAuth() {
  return (
    <Routes>
      <Route index element={<PharmacyAuthLoginPage />} />
    </Routes>
  );
}

export default CustomerAuth;
