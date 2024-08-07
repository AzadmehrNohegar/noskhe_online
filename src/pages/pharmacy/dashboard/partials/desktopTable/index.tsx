import { Chip } from "@/components/chip";
import {
  _new_order_list,
  DELIVERY_TYPE,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";

function DesktopDashboardTable({
  fields,
}: IResponsiveGatewayProps<_new_order_list>) {
  return (
    <table className="table">
      <thead className="text-gray-500 text-sm border-t border-b border-t-gray-200 border-b-gray-200 bg-secondary bg-opacity-5">
        <tr className="border-0">
          <th align="right">#</th>
          <th align="right">نام بیمار</th>
          <th align="right">نوع ارسال</th>
          <th align="right">
            <span className="inline-flex items-center gap-2">
              تاریخ سفارش
              <button>
                <IconWrapper iconSize="medium" className="icon-Sort-16" />
              </button>
            </span>
          </th>
          <th align="right">وضعیت</th>
          <th align="left"></th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {fields?.map((item, index) => (
          <tr key={index} className="border-0 odd:bg-white">
            <td align="right">
              <span className="plaintext">{index + 1}</span>
            </td>
            <td align="right">
              <span className="plaintext">{item.fullName}</span>
            </td>
            <td align="right">
              <span className="plaintext">
                {DELIVERY_TYPE[item.deliveryType]}
              </span>
            </td>
            <td align="right" className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt || ""))}
            </td>

            <td align="right">
              <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
            </td>
            <td align="left">
              <Link
                to="./order/1"
                className="btn btn-link text-secondary btn-sm px-0"
              >
                جزئیات سفارش
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { DesktopDashboardTable };
