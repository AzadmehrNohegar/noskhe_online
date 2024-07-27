import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { OrderSingleInvoice } from "./partials/invoice";
import { OrderSinglePending } from "./partials/pending";

function OrderSingle() {
  const [searchParams] = useDebouncedSearchParams(0);

  if (searchParams.get("status") === "SUCCESS") return <OrderSingleInvoice />;

  return <OrderSinglePending />;
}

export default OrderSingle;
