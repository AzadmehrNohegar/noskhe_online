import {
  Fragment,
  // useState
} from "react";
import { IconWrapper } from "@/shared/iconWrapper";
import { ListSearchWrapper } from "@/shared/listSearchWrapper";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { useMediaQuery } from "usehooks-ts";
import { OrderDesktopTable } from "./partials/desktopTable";
import { OrderMobileTable } from "./partials/mobileTable";
// import { RecentFilterDialog } from "./partials/filterDialog";
import { Pagination } from "@/shared/pagination";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { _order_list, IResponsiveGatewayProps } from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { getUserOrderList } from "@/api/user";

function OrderTable(props: IResponsiveGatewayProps<_order_list>) {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches) return <OrderMobileTable {...props} />;

  return <OrderDesktopTable {...props} />;
}

function OrderList() {
  // const [isRecentFilterDialogOpen, setIsRecentFilterDialogOpen] =
  //   useState(false);

  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { data: orderPagination, isLoading } = useQuery(
    ["order-pagination", searchParams.toString()],
    () =>
      getUserOrderList({
        params: {},
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
    <Fragment>
      <div className="min-h-full flex flex-col gap-4">
        <Breadcrumbs className="lg:hidden" />
        <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap lg:justify-normal">
          <ListSearchWrapper className="basis-full lg:basis-auto lg:me-auto" />
          <button className="btn btn-secondary btn-square">
            <IconWrapper
              iconSize="large"
              className="icon-Download-Minimalistic"
            />
          </button>
          {/* <button
            className="btn btn-ghost ms-auto lg:ms-0"
            onClick={() => setIsRecentFilterDialogOpen(true)}
          >
            <IconWrapper
              iconSize="large"
              className="icon-filter-16 hidden lg:inline"
            />
            افزودن فیلتر
          </button> */}
        </div>
        <OrderTable
          fields={orderPagination?.data.result.data}
          isLoading={isLoading}
        />
        <Pagination
          count={orderPagination?.data.result.count || 0}
          page={+(searchParams.get("page") || 0)}
          setPage={(val) => {
            searchParams.set("page", String(val));
            setSearchParams(searchParams);
          }}
          next={orderPagination?.data.result.next || null}
          prev={orderPagination?.data.result.previous || null}
        />
      </div>
      {/* <RecentFilterDialog
        isOpen={isRecentFilterDialogOpen}
        closeModal={() => setIsRecentFilterDialogOpen(false)}
      /> */}
    </Fragment>
  );
}

export default OrderList;
