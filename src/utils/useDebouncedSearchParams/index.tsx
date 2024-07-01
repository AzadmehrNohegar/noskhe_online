import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";

const useDebouncedSearchParams = (
  delay?: number
): [URLSearchParams, SetURLSearchParams] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchParams] = useDebounceValue(searchParams, delay || 200);

  return [debouncedSearchParams, setSearchParams];
};

export { useDebouncedSearchParams };
