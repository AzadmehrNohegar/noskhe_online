import { getUserOrderSingleInvoiceById, postUserPayment } from "@/api/user";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

function Callback() {
  const [searchParams] = useDebouncedSearchParams(0);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: invoiceData } = useQuery(
    "order-callback",
    () =>
      getUserOrderSingleInvoiceById({
        id: searchParams.get("invoiceId") || "",
      }),
    {
      onSuccess: (res) => {
        setTimeout(() => {
          if (res?.data)
            handleRedirect(
              res.data.data.detail.orderId,
              res.data.data.detail.status
            );
        }, 5000);
      },
    }
  );

  const createPayment = useMutation(postUserPayment, {
    onSuccess: (res) => {
      if (res?.data) {
        const link = document.createElement("a");
        link.href = res.data.data.GateWayUrl;
        document.body.append(link);
        link.click();
        link.parentElement?.removeChild(link);
      }
    },
  });

  const handlePayment = () =>
    createPayment.mutate({
      body: {
        invoiceId: `${invoiceData?.data.data.detail.invoiceId}`,
        callback: `${window.location.origin}/callback`,
      },
    });

  const handleRedirect = (orderId?: number, status?: string) => {
    queryClient.invalidateQueries();
    navigate(
      `/order/${orderId || invoiceData?.data.data.detail.orderId}?status=${
        status || invoiceData?.data.data.detail.status
      }`
    );
  };

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={128} height={58} alt="logo" />
      </div>
      <div className="w-full flex items-center justify-center bg-misc-light-bg h-full p-5 max-w-screen-sm mx-auto">
        {searchParams.get("status") === "true" ? (
          <div className="flex flex-col gap-12 w-full">
            <img
              src="/images/order-success.svg"
              className="w-96 mx-auto"
              alt="order success"
            />
            <h1 className="text-xl lg:text-3xl text-center font-extrabold">
              پرداخت شما با موفقیت انجام شد.
            </h1>

            <ul className="flex flex-col divide-y divide-gray-200">
              <li className="flex items-center justify-between py-2">
                <strong>شماره فاکتور</strong>
                <span className="text-gray-600">
                  {Number(searchParams.get("invoiceId")).toLocaleString()}
                </span>
              </li>
              <li className="flex items-center justify-between py-2">
                <strong>مقدار تراکنش</strong>
                <span className="text-gray-600">
                  {Number(searchParams.get("amount")).toLocaleString()} ریال
                </span>
              </li>
              <li className="flex items-center justify-between py-2">
                <strong>تاریخ تراکنش</strong>
                <span className="text-gray-600 plaintext">
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(searchParams.get("paidAt") || ""))}
                </span>
              </li>
            </ul>
            <span className="text-gray-600 mx-auto">
              درحال بازگشت به صفحه فاکتور...
            </span>
            <button
              className="btn btn-success btn-block text-white"
              onClick={() => handleRedirect()}
            >
              بازگشت به صفحه فاکتور
            </button>
          </div>
        ) : null}
        {searchParams.get("status") === "false" ? (
          <div className="flex flex-col gap-12 w-full">
            <img
              src="/images/order-fail.svg"
              className="w-96 mx-auto"
              alt="order success"
            />
            <h1 className="text-xl lg:text-3xl text-center font-extrabold">
              پرداخت شما با موفقیت انجام نشد.
            </h1>
            <ul className="flex flex-col divide-y divide-gray-200">
              <li className="flex items-center justify-between py-2">
                <strong>شماره فاکتور</strong>
                <span className="text-gray-600">
                  {Number(searchParams.get("invoiceId")).toLocaleString()}
                </span>
              </li>
              <li className="flex items-center justify-between py-2">
                <strong>مقدار تراکنش</strong>
                <span className="text-gray-600">
                  {Number(searchParams.get("amount")).toLocaleString()} ریال
                </span>
              </li>
            </ul>
            <div className="flex items-center w-full gap-4">
              <button
                className="btn btn-secondary basis-modified2 btn-block text-white"
                onClick={handlePayment}
                disabled={createPayment.isLoading}
              >
                پرداخت دوباره
              </button>
              <button
                className="btn btn-success basis-modified2 btn-block text-white"
                onClick={() => handleRedirect()}
              >
                بازگشت به صفحه فاکتور
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Callback;
