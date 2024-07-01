import { Chip } from "@/components/chip";
import { GENERAL_STATUS } from "@/model";

function MobileDashboardTable() {
  return (
    <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {new Array(8).fill(null).map((_, index) => (
        <ul key={index} className="flex flex-col gap-4 p-4 even:bg-white">
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">شناسه سفارش</span>
            <span className="text-sm text-gray-700">1234</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">تاریخ سفارش</span>
            <span className="text-sm text-gray-700 plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xs text-gray-500">وضعیت سفارش</span>
            <Chip status="PENDING">{GENERAL_STATUS["PENDING"]}</Chip>
          </li>
        </ul>
      ))}
    </div>
  );
}

export { MobileDashboardTable };
