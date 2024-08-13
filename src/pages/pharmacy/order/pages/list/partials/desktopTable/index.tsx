import { Chip } from "@/components/chip";
import {
  _pharmacy_order_list,
  DELIVERY_TYPE,
  GENERAL_STATUS,
  IResponsiveGatewayProps,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { Link } from "react-router-dom";

function OrderDesktopTable({
  fields,
}: IResponsiveGatewayProps<_pharmacy_order_list>) {
  const [searchParams] = useDebouncedSearchParams(0);

  return (
    <table className="table">
      <thead className="text-gray-500 text-sm border-t border-b border-t-gray-200 border-b-gray-200 bg-gray-50">
        <tr className="border-0">
          <th align="right">#</th>
          <th align="right">نام بیمار</th>

          <th align="right">قیمت کل</th>
          <th align="right">زمان ارسال</th>
          <th align="right">
            <span className="inline-flex items-center gap-2">
              تاریخ سفارش
              <button>
                <IconWrapper iconSize="medium" className="icon-Sort-16" />
              </button>
            </span>
          </th>
          <th align="right">روش ارسال</th>
          <th align="right">وضعیت</th>

          <th align="left"></th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {fields?.map((item, index) => (
          <tr key={item._id} className="border-0 odd:bg-white">
            <td align="right">
              {((+searchParams.get("page")! || 1) - 1) *
                (+searchParams.get("page_size")! || 10) +
                index +
                1}
            </td>
            <td align="right">
              <span className="plaintext">{item.fullName || "-"}</span>
            </td>
            <td align="right">
              <strong className="plaintext line-clamp-1">
                {item.totalPrice.toLocaleString()}{" "}
                <span className="font-light">ریال</span>
              </strong>
            </td>
            <td align="right">
              {item.deliveryType === "PERSON" ? (
                <strong className="plaintext line-clamp-1">
                  {item.deliveryTime
                    ? new Intl.DateTimeFormat("fa-IR", {
                        dateStyle: "full",
                        timeStyle: "short",
                      }).format(new Date(item.deliveryTime || ""))
                    : "-"}
                </strong>
              ) : (
                "-"
              )}
            </td>
            <td align="right" className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </td>

            <td align="right">
              <span className="plaintext">
                {DELIVERY_TYPE[item.deliveryType] || "-"}
              </span>
            </td>
            <td align="right">
              <Chip status={item.status}>{GENERAL_STATUS[item.status]}</Chip>
            </td>

            <td align="left">
              <Link
                to={`./${item._id}?status=${item.status}`}
                className="btn btn-link text-primary btn-sm"
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

export { OrderDesktopTable };
