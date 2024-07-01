import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrderSinglePage = lazy(() => import("./pages/single"));
const OrderListPage = lazy(() => import("./pages/list"));

function Order() {
  return (
    <Routes>
      <Route index element={<OrderListPage />} />
      <Route path=":orderId" element={<OrderSinglePage />} />
    </Routes>
  );
}

export default Order;
