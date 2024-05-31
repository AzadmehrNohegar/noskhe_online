import { getSubscriptionApiSubscriptions } from "@/api/subscription";
import { RadioSelect } from "@/components/radioSelect";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { useQuery } from "react-query";

interface IPhoneSearchProps {
  param: string;
  containerClassName?: string;
}

function PhoneSearch({ param, containerClassName }: IPhoneSearchProps) {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { data: subscriptionList } = useQuery(
    "subscriptions-list",
    () =>
      getSubscriptionApiSubscriptions({
        params: {
          limit: 100,
          status_code: "success",
        },
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <RadioSelect
      placeholder="شماره تماس"
      containerClassName={containerClassName}
      selected={
        searchParams.get(param)
          ? {
              id: searchParams.get(param)!,
              label: searchParams.get(param)!,
            }
          : null
      }
      options={
        subscriptionList?.data.data.map((item) => ({
          id: item.number,
          label: item.number,
          obj: item,
        })) || []
      }
      setSelected={(val) => {
        if (val) {
          searchParams.set(param, `${val?.id}`);
          setSearchParams(searchParams);
        }
      }}
    />
  );
}

export { PhoneSearch };
