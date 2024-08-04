import { Chip } from "@/components/chip";
import {
  _new_order_list,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
} from "@/model";
import { Link } from "react-router-dom";

function MobileDashboardTable({
  fields,
}: IResponsiveGatewayProps<_new_order_list>) {
  return (
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {fields?.map((item, index) => (
        <ul key={index} className="flex flex-col gap-4 p-4 even:bg-white">
          <li className="flex items-center justify-between">
            <span className="line-clamp-1 text-sm">
              <span className="inline-flex w-7 min-w-7 h-7 items-center justify-center bg-gray-200 text-xs text-gray-600 rounded-lg">
                {index + 1}
              </span>{" "}
              {item.refId || "-"}
            </span>
            <Link
              to="./order/1"
              className="btn btn-link text-secondary btn-sm px-0"
            >
              مشاهده جزئیات
            </Link>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">تاریخ سفارش</span>
            <span className="text-sm text-gray-700 plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt || ""))}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">وضعیت سفارش</span>
            <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { MobileDashboardTable };
