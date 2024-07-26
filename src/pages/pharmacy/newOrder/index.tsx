import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NewOrderList = lazy(() => import("./pages/list"));
const NewOrderSingle = lazy(() => import("./pages/single"));
const NewOrderPrice = lazy(() => import("./pages/price"));

function NewOrder() {
  return (
    <Routes>
      <Route index element={<NewOrderList />} />
      <Route path=":orderId" element={<NewOrderSingle />} />
      <Route path=":orderId/price" element={<NewOrderPrice />} />
    </Routes>
  );
}

export default NewOrder;
