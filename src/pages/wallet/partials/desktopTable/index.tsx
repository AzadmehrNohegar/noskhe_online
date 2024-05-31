import { postPaymentApiPayments } from "@/api/payment";
import { Chip } from "@/components/chip";
import {
  credit_invoice,
  INVOICE_USED_FOR,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
  OPERATION_TYPE,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useToastStore } from "@/store/toast";
import clsx from "clsx";
import { useMutation, useQueryClient } from "react-query";

function WalletDesktopTable({
  fields,
}: IResponsiveGatewayProps<credit_invoice>) {
  const { stackToast } = useToastStore();

  const queryClient = useQueryClient();

  const createPayment = useMutation(postPaymentApiPayments, {
    onSuccess: (res) => {
      if (res?.data) {
        stackToast({
          title: "در حال انتقال به درگاه پرداخت...",
          options: {
            type: "success",
          },
        });
        window.location.replace(res.data.redirect_to!);
        queryClient.invalidateQueries();
      }
    },
  });

  const handlePayment = (item: credit_invoice) =>
    createPayment.mutate({
      body: {
        description: "پرداخت کیف پول",
        invoice_id: item.id,
        invoice_type: "credit_invoice",
        payment_gateway: "mis",
        files_id: [],
      },
    });

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <table className="table">
        <thead className="text-gray-500 text-sm border-b border-b-secondary-200 bg-secondary-10">
          <tr className="border-0">
            <th align="right">
              <span className="inline-flex items-center gap-2">
                شرح تراکنش
                <button>
                  <IconWrapper iconSize="medium" className="icon-Sort-16" />
                </button>
              </span>
            </th>
            <th align="right">نوع تراکنش</th>
            <th align="right">
              <span className="inline-flex items-center gap-2">
                مبلغ تراکنش
                <button>
                  <IconWrapper iconSize="medium" className="icon-Sort-16" />
                </button>
              </span>
            </th>
            <th align="right">زمان تراکنش</th>

            <th align="right">وضعیت</th>
            <th align="left"></th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {fields?.map((item) => (
            <tr key={item.id} className="border-0 even:bg-misc-very-light">
              <td align="right">
                <span className="line-clamp-1 max-w-64">
                  {INVOICE_USED_FOR[item.used_for || ""]}
                </span>
              </td>
              <td align="right">
                <span
                  className={clsx(
                    item.operation_type === "decrease" && "text-red-600",
                    item.operation_type === "increase" && "text-success"
                  )}
                >
                  {OPERATION_TYPE[item.operation_type]}
                </span>
              </td>
              <td align="right">
                <strong>
                  {Number(item.total_cost).toLocaleString()}{" "}
                  <span className="font-light text-gray-500">ریال</span>
                </strong>
              </td>
              <td align="right">
                <span className="plaintext">
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(+item.created_at * 1000))}
                </span>
              </td>
              <td align="right">
                <Chip status={item.status_code}>
                  {GENERAL_STATUS[item.status_code]}
                </Chip>
              </td>
              <td align="left">
                {item.status_code === "ready" ? (
                  <button
                    className="btn btn-outline btn-primary btn-sm border-primary-200"
                    onClick={() => handlePayment(item)}
                  >
                    پرداخت
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { WalletDesktopTable };
