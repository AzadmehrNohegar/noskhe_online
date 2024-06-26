import { Chip } from "@/components/chip";
import { _order_list, GENERAL_STATUS, IResponsiveGatewayProps } from "@/model";
import { Link } from "react-router-dom";

function OrderMobileTable({ fields }: IResponsiveGatewayProps<_order_list>) {
  return (
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {fields?.map((item) => (
        <ul
          key={item._id}
          className="flex flex-col gap-4 p-4 even:bg-misc-very-light"
        >
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{item._id}</span>
            <span className="text-sm text-gray-700">
              <Link to={`./${item._id}`} className="btn btn-primary btn-sm">
                جزئیات سفارش
              </Link>
            </span>
          </li>
          <li className="flex items-center gap-3 justify-between">
            <span className="text-sm text-gray-500">توضیحات سفارش</span>
            <span className="text-sm text-gray-700 line-clamp-1">
              <span className="plaintext">{item.description}</span>
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-gray-700">وضعیت</span>
            <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { OrderMobileTable };
