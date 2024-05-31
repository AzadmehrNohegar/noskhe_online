import { postPaymentApiPayments } from "@/api/payment";
import { Chip } from "@/components/chip";
import {
  credit_invoice,
  GENERAL_STATUS,
  INVOICE_USED_FOR,
  IResponsiveGatewayProps,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useToastStore } from "@/store/toast";
import { useMutation, useQueryClient } from "react-query";

function WalletMobileTable({
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
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {fields?.map((item) => (
        <ul
          key={item.id}
          className="flex flex-col gap-4 p-4 even:bg-misc-very-light"
        >
          <li className="flex items-center gap-2">
            <span className="text-sm text-gray-700 inline-flex items-center gap-2 line-clamp-1 me-auto">
              {item.operation_type === "decrease" ? (
                <span className="w-7 min-w-7 h-7 bg-danger-10 inline-flex text-red-600 items-center justify-center rounded-md">
                  <IconWrapper
                    iconSize="medium"
                    className="icon-Arrow-Down-16"
                  />
                </span>
              ) : null}
              {item.operation_type === "increase" ? (
                <span className="w-7 min-w-7 h-7 bg-success-10 inline-flex text-success items-center justify-center rounded-md">
                  <IconWrapper iconSize="medium" className="icon-Arrow-Up-16" />
                </span>
              ) : null}
              {INVOICE_USED_FOR[item.used_for || ""]}
            </span>
            {item.status_code === "ready" ? (
              <button
                className="btn btn-outline btn-primary btn-sm border-primary-200"
                onClick={() => handlePayment(item)}
              >
                پرداخت
              </button>
            ) : null}
            <Chip status={item.status_code}>
              {GENERAL_STATUS[item.status_code]}
            </Chip>
          </li>
          <li className="flex items-center justify-between">
            <strong className="text-gray-700 text-sm">
              {Number(item.total_cost).toLocaleString()}{" "}
              <span className="font-light text-gray-500 text-xs">ریال</span>
            </strong>
            <span className="text-sm text-gray-700 plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(+item.created_at * 1000))}
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { WalletMobileTable };
