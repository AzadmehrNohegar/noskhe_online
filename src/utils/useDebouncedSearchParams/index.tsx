import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";

const useDebouncedSearchParams = (): [URLSearchParams, SetURLSearchParams] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchParams] = useDebounceValue(searchParams, 200);

  return [debouncedSearchParams, setSearchParams];
};

export { useDebouncedSearchParams };
