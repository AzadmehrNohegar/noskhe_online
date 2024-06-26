import { Chip } from "@/components/chip";
import { _order_list, GENERAL_STATUS, IResponsiveGatewayProps } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";

function OrderMobileTable({ fields }: IResponsiveGatewayProps<_order_list>) {
  return (
    <div className="flex flex-col rounded-md border border-grey-200 overflow-hidden">
      {fields?.map((item) => (
        <ul
          key={item._id}
          className="flex flex-col gap-4 p-4 even:bg-misc-very-light"
        >
          <li className="flex items-center justify-between">
            <span className="text-xs text-grey-500">{item._id}</span>
            <span className="text-sm text-grey-700">
              <Link
                to={`./${item._id}`}
                className="btn btn-link btn-xs btn-square text-gray-800"
              >
                <IconWrapper className="icon-Eye-16" iconSize="medium" />
              </Link>
            </span>
          </li>
          <li className="flex items-center gap-3 justify-between">
            <span className="text-sm text-grey-500">توضیحات سفارش</span>
            <span className="text-sm text-grey-700 line-clamp-1">
              <span className="plaintext">{item.description}</span>
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-700">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </span>
            <span className="text-sm text-grey-700 plaintext">
              {item.accepted ? "پذیرفته شده" : "پذیرفته نشده"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-700">وضعیت</span>
            <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { OrderMobileTable };
