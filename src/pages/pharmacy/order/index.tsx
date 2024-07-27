import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrderList = lazy(() => import("./pages/list"));
const OrderSingle = lazy(() => import("./pages/single"));

function Order() {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path=":orderId" element={<OrderSingle />} />
    </Routes>
  );
}

export default Order;
