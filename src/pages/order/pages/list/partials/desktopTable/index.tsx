import { Chip } from "@/components/chip";
import {
  _order_list,
  DELIVERY_TYPE,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";

function OrderDesktopTable({ fields }: IResponsiveGatewayProps<_order_list>) {
  return (
    <table className="table">
      <thead className="text-grey-500 text-sm border-t border-b border-t-secondary-200 border-b-secondary-200 bg-secondary-10">
        <tr className="border-0">
          <th align="right">شناسه سفارش</th>
          <th align="right">توضیحات سفارش</th>
          <th align="right">
            <span className="inline-flex items-center gap-2">
              تاریخ سفارش
              <button>
                <IconWrapper iconSize="medium" className="icon-Sort-16" />
              </button>
            </span>
          </th>
          <th align="right">
            <span className="inline-flex items-center gap-2">
              پذیرفته شده
              <button>
                <IconWrapper iconSize="medium" className="icon-Sort-16" />
              </button>
            </span>
          </th>
          <th align="right">نوع ارسال</th>
          <th align="right">وضعیت</th>
          <th align="left">وضعیت</th>
        </tr>
      </thead>
      <tbody className="text-grey-700 text-sm">
        {fields?.map((item) => (
          <tr key={item._id} className="border-0 even:bg-misc-very-light">
            <td align="right">
              <span className="plaintext">{item._id}</span>
            </td>
            <td align="right">
              <span className="plaintext">{item.description}</span>
            </td>
            <td align="right">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </td>

            <td align="right">
              {item.accepted ? "پذیرفته شده" : "پذیرفته نشده"}
            </td>
            <td align="right">{DELIVERY_TYPE[item.deliveryType]}</td>
            <td align="right">
              <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
            </td>
            <td align="left">
              <Link
                to={`./${item._id}`}
                className="btn btn-link btn-xs btn-square text-gray-800"
              >
                <IconWrapper className="icon-Eye-16" iconSize="medium" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { OrderDesktopTable };
