import { ListSearchWrapper } from "@/shared/listSearchWrapper";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { useMediaQuery } from "usehooks-ts";
import { Pagination } from "@/shared/pagination";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { _new_order_list, IResponsiveGatewayProps } from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { getPharmacyFactorNewOrderList } from "@/api/pharmacy";
import { NewOrderDesktopTable } from "./partials/desktopTable";
import { NewOrderMobileTable } from "./partials/mobileTable";

function NewOrderTable(props: IResponsiveGatewayProps<_new_order_list>) {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches) return <NewOrderMobileTable {...props} />;

  return <NewOrderDesktopTable {...props} />;
}

function NewOrderList() {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { data: orderPagination, isLoading } = useQuery(
    ["new-order-pagination", searchParams.toString()],
    () =>
      getPharmacyFactorNewOrderList({
        params: {
          search: searchParams.get("search"),
          page: searchParams.get("page"),
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
      </div>
      <NewOrderTable
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

export default NewOrderList;
