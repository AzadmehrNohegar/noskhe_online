import { Chip } from "@/components/chip";
import { DELIVERY_TYPE, GENERAL_STATUS } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";

function DesktopDashboardTable() {
  return (
    <table className="table">
      <thead className="text-gray-500 text-sm border-t border-b border-t-gray-200 border-b-gray-200 bg-secondary bg-opacity-5">
        <tr className="border-0">
          <th align="right">#</th>
          <th align="right">
            <span className="inline-flex items-center gap-2">
              تاریخ سفارش
              <button>
                <IconWrapper iconSize="medium" className="icon-Sort-16" />
              </button>
            </span>
          </th>
          <th align="right">نوع ارسال</th>
          <th align="right">وضعیت</th>
          <th align="left"></th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {new Array(8).fill(null).map((_, index) => (
          <tr key={index} className="border-0 odd:bg-white">
            <td align="right">
              <span className="plaintext">{index + 1}</span>
            </td>
            <td align="right" className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </td>
            <td align="right">{DELIVERY_TYPE["COURIER"]}</td>
            <td align="right">
              <Chip status="PENDING">{GENERAL_STATUS["PENDING"]}</Chip>
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
