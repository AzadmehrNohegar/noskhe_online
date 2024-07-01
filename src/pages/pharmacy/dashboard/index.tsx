import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { MobileDashboardTable } from "./partials/mobileTable";
import { DesktopDashboardTable } from "./partials/desktopTable";

function DashboardTable() {
  const matches = useMediaQuery("(max-width: 1024px)");

  if (matches) return <MobileDashboardTable />;

  return <DesktopDashboardTable />;
}

function Dashboard() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4">
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-primary before:rounded-1.5xl rounded-1.5xl px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات تایید نشده
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              8{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="/"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-secondary before:rounded-1.5xl rounded-1.5xl px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات در انتظار تایید
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              1{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="/"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-warning before:rounded-1.5xl rounded-1.5xl px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات جاری
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              0{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="/"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex w-full lg:w-7/12 flex-col border border-gray-200 divide-y divide-gray-200 rounded-1.5xl overflow-hidden">
          <h2 className="p-4 bg-secondary bg-opacity-10 text-secondary-700 flex items-center gap-2 font-semibold text-sm lg:text-base">
            لیست سفارش‌ها
          </h2>
          <DashboardTable />
        </div>
        <div className="flex w-full lg:w-5/12 flex-col border border-gray-200 divide-y divide-gray-200 rounded-1.5xl overflow-hidden">
          <h2 className="p-4 bg-gray-50 flex items-center gap-2 font-semibold text-sm lg:text-base">
            تیکت‌ها
          </h2>
          <div className="flex flex-col gap-4 items-center justify-center p-4">
            <img
              src="/images/ticket-empty.svg"
              className="max-w-96 w-full"
              alt="ticket empty"
            />
            <span className="text-sm lg:text-base">هیچ تیکتی وجود ندارد.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
