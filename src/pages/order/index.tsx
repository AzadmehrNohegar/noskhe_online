import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrderSinglePage = lazy(() => import("./pages/single"));

function Order() {
  return (
    <Routes>
      <Route path=":orderId" element={<OrderSinglePage />} />
    </Routes>
  );
}

export default Order;
