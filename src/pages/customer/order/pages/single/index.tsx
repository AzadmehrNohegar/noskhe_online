import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { OrderSingleInvoice } from "./partials/invoice";
import { OrderSinglePending } from "./partials/pending";

function OrderSingle() {
  const [searchParams] = useDebouncedSearchParams(0);

  if (
    searchParams.get("status") === "SUCCESS" ||
    searchParams.get("status") === "WFP" ||
    searchParams.get("status") === "DELIVERED" ||
    searchParams.get("status") === "PAID"
  )
    return <OrderSingleInvoice />;

  return <OrderSinglePending />;
}

export default OrderSingle;
