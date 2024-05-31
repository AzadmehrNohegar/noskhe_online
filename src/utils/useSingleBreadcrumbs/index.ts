import { useEffect } from "react";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

const useSingleBreadcrumbs = (breadcrumb: string) => {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  useEffect(() => {
    searchParams.set("breadcrumb", breadcrumb);
    setSearchParams(searchParams, {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumb]);
};

export { useSingleBreadcrumbs };
