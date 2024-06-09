import { useParams } from "react-router-dom";

function OrderSingle() {
  const { orderId } = useParams();
  return <div>{orderId}</div>;
}

export default OrderSingle;
