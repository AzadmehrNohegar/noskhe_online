import { BREADCRUMBS_LABEL } from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import clsx from "clsx";
import { HTMLProps, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs({ className }: HTMLProps<HTMLDivElement>) {
  const { pathname } = useLocation();
  const [searchParams] = useDebouncedSearchParams();

  const breadcrumbs = useMemo(() => {
    const res = pathname
      .split("/")
      .splice(1)
      .filter((el) => BREADCRUMBS_LABEL[el])
      .map((el) => ({
        path: el,
        label: BREADCRUMBS_LABEL[el],
      }));
    if (searchParams.get("breadcrumb")) {
      res.push({
        path: searchParams.get("breadcrumb")!,
        label: searchParams.get("breadcrumb")!,
      });
    }
    return res;
  }, [pathname, searchParams]);

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {breadcrumbs.map((item, index) => {
        if (index === breadcrumbs.length - 1)
          return (
            <span
              key={item.path}
              className="text-primary-800 lg:text-xl font-bold plaintext"
            >
              {item.label}
            </span>
          );
        return (
          <Link
            key={item.path}
            to={item.path}
            className="inline-flex items-center gap-2 text-primary text-sm lg:text-base after:content-['\e90d'] after:font-icomoon plaintext"
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export { Breadcrumbs };
