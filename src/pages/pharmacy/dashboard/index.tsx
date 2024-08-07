import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { MobileDashboardTable } from "./partials/mobileTable";
import { DesktopDashboardTable } from "./partials/desktopTable";
import { useQueries } from "react-query";
import {
  getPharmacyDashboard,
  getPharmacyFactorNewOrderList,
} from "@/api/pharmacy";
import Skeleton from "react-loading-skeleton";
import { _new_order_list, IResponsiveGatewayProps } from "@/model";

function DashboardTable(props: IResponsiveGatewayProps<_new_order_list>) {
  const matches = useMediaQuery("(max-width: 1024px)");

  if (matches) return <MobileDashboardTable {...props} />;

  return <DesktopDashboardTable {...props} />;
}

function Dashboard() {
  const [dashboardKpi, dashboardNewOrder] = useQueries([
    {
      queryKey: ["pharmacy-dashboard"],
      queryFn: () => getPharmacyDashboard(),
    },
    {
      queryKey: ["new-order"],
      queryFn: () => getPharmacyFactorNewOrderList({}),
    },
  ]);

  if (dashboardKpi.isLoading || dashboardNewOrder.isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3">
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-primary before:rounded-lg rounded-lg px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات تایید نشده
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.UNCONFIRMED_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="new-order"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-secondary before:rounded-lg rounded-lg px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات در انتظار پرداخت
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.CONFIRMED_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="order?list=WFP"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-warning before:rounded-lg rounded-lg px-6 py-4">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات جاری تحویل با پیک
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.WFC_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="order?list=COURIER"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3">
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-secondary before:rounded-lg rounded-lg px-6 py-4 before:grayscale">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات جاری حضوری
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.CURRENT_PERSON_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="order?list=PERSON"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-warning before:rounded-lg rounded-lg px-6 py-4 before:hue-rotate-180">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات در انتظار پیک
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.CURRENT_COURIER_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="order?list=WFC"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 bg-white relative before:absolute before:inset-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover before:bg-pattern-primary before:rounded-lg rounded-lg px-6 py-4 before:hue-rotate-90">
          <h3 className="font-normal text-gray-600 text-sm lg:text-lg relative">
            سفارشات کل
          </h3>
          <div className="flex items-center justify-between w-full relative">
            <strong className="lg:text-xl">
              {dashboardKpi.data?.data.data.ALL_OF_ORDERS}{" "}
              <span className="font-normal text-2xs lg:text-sm text-gray-600">
                سفارش
              </span>
            </strong>
            <Link
              to="order?list=ALL"
              className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary text-xs"
            >
              مشاهده سفارشات
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex w-full lg:w-7/12 flex-col border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
          <h2 className="p-4 bg-secondary bg-opacity-5 text-secondary-700 flex items-center gap-2 font-semibold text-sm lg:text-base">
            لیست سفارشات تایید نشده
            <Link
              to="new-order"
              className="ms-auto btn btn-link text-gray-800 h-fit min-h-fit px-0"
            >
              مشاهده همه
              <span className="icon-Arrow-Left-16 text-lg"></span>
            </Link>
          </h2>
          <DashboardTable
            fields={dashboardNewOrder.data?.data.result.data}
            isLoading={dashboardNewOrder.isLoading}
          />
        </div>
        <div className="flex w-full lg:w-5/12 flex-col border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
          <h2 className="p-4 bg-gray-50 flex items-center gap-2 font-semibold text-sm lg:text-base">
            تراکنش‌ها
            <Link
              to="/"
              className="ms-auto btn btn-link text-gray-800 h-fit min-h-fit px-0"
            >
              مشاهده همه
              <span className="icon-Arrow-Left-16 text-lg"></span>
            </Link>
          </h2>
          <div className="flex flex-col gap-4 items-center justify-center p-4">
            <img
              src="/images/ticket-empty.svg"
              className="max-w-96 w-full"
              alt="ticket empty"
            />

            <span className="text-sm lg:text-base">هیچ تراکنش وجود ندارد.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
