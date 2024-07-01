import { Chip } from "@/components/chip";
import { _order_list, GENERAL_STATUS, IResponsiveGatewayProps } from "@/model";
import { Link } from "react-router-dom";

function OrderMobileTable({ fields }: IResponsiveGatewayProps<_order_list>) {
  return (
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {fields?.map((item) => (
        <ul key={item._id} className="flex flex-col gap-4 p-4 even:bg-white">
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">شناسه سفارش</span>
            <span className="text-sm text-gray-700">{item.refId || "-"}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-gray-700 plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
            <span className="text-sm text-gray-700">
              <Link
                to={`./${item._id}`}
                className="btn btn-link text-primary btn-sm"
              >
                جزئیات سفارش
              </Link>
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { OrderMobileTable };
