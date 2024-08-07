import { Chip } from "@/components/chip";
import {
  _new_order_list,
  DELIVERY_TYPE,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
} from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { Link } from "react-router-dom";

function NewOrderMobileTable({
  fields,
}: IResponsiveGatewayProps<_new_order_list>) {
  const [searchParams] = useDebouncedSearchParams(0);

  return (
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {fields?.map((item, index) => (
        <ul key={item._id} className="flex flex-col gap-4 p-4 even:bg-white">
          <li className="flex items-center justify-between">
            <span className="line-clamp-1 text-sm">
              <span className="inline-flex w-7 min-w-7 h-7 items-center justify-center bg-gray-200 text-xs text-gray-600 rounded-lg">
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </span>{" "}
              {item.fullName || "-"}
            </span>
            <Link
              to={`./${item.orderId}?status=${item.status}`}
              className="btn btn-link text-primary btn-sm px-0"
            >
              مشاهده جزئیات
            </Link>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">شناسه سفارش</span>
            <span className="text-sm text-gray-700 plaintext">
              {item.refId || "-"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">نوع ارسال</span>
            <span className="text-sm text-gray-700 plaintext">
              {DELIVERY_TYPE[item.deliveryType]}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">تاریخ سفارش</span>
            <span className="text-sm text-gray-700 plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
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

export { NewOrderMobileTable };
