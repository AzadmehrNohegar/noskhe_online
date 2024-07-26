import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const InvoiceListPage = lazy(() => import("./pages/list"));

function Invoice() {
  return (
    <Routes>
      <Route index element={<InvoiceListPage />} />
    </Routes>
  );
}

export default Invoice;
