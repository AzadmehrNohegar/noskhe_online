import { ListSearchWrapper } from "@/shared/listSearchWrapper";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { useMediaQuery } from "usehooks-ts";
import { Pagination } from "@/shared/pagination";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import {
  _pharmacy_order_list,
  IResponsiveGatewayProps,
  ORDER_TYPE,
} from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { getPharmacyFactorOrderList } from "@/api/pharmacy";
import { OrderDesktopTable } from "./partials/desktopTable";
import { OrderMobileTable } from "./partials/mobileTable";
import { StatelessSelect } from "@/components/statelessSelect";

function OrderTable(props: IResponsiveGatewayProps<_pharmacy_order_list>) {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches) return <OrderMobileTable {...props} />;

  return <OrderDesktopTable {...props} />;
}

function OrderList() {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { data: orderPagination, isLoading } = useQuery(
    ["pharmacy-order-pagination", searchParams.toString()],
    () =>
      getPharmacyFactorOrderList({
        params: {
          search: searchParams.get("search"),
          page: searchParams.get("page"),
          list: searchParams.get("list") || "ALL",
        },
      }),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <Breadcrumbs className="lg:hidden" />
      <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap lg:justify-normal">
        <ListSearchWrapper
          type="number"
          className="basis-full lg:basis-auto lg:me-auto"
        />
        <StatelessSelect
          containerClassName="w-full basis-full lg:basis-modified3 !bg-transparent"
          label="نوع سفارش"
          placeholder="نوع سفارش"
          options={["ALL", "PERSON", "COURIER", "WFC", "WFP", "CONFIRMED"]}
          optionDictionary={ORDER_TYPE}
          selected={searchParams.get("list")}
          setSelected={(o) => {
            searchParams.set("list", o);
            setSearchParams(searchParams);
          }}
        />
      </div>
      <OrderTable
        fields={orderPagination?.data.result.data}
        isLoading={isLoading}
      />
      <Pagination
        count={orderPagination?.data.result.count || 0}
        page={searchParams.get("page") || "1"}
        setPage={(val) => {
          searchParams.set("page", val);
          setSearchParams(searchParams);
        }}
        next={orderPagination?.data.result.next || null}
        prev={orderPagination?.data.result.previous || null}
      />
    </div>
  );
}

export default OrderList;
