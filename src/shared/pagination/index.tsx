import clsx from "clsx";
import { IconWrapper } from "@/shared/iconWrapper";
import { Fragment } from "react";

interface IPaginationProps {
  page: number;
  count: number;
  setPage: (val: number) => void;
  next: string | null;
  prev: string | null;
  isFixed?: boolean;
  containerClassName?: string;
}

function Pagination({
  count,
  next,
  page,
  prev,
  setPage,
  isFixed = true,
  containerClassName,
}: IPaginationProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 lg:flex-row justify-center lg:justify-end items-center py-4 bg-transparent mt-auto",
        isFixed && "w-full lg:sticky bottom-0",
        !isFixed && "absolute bottom-0 w-full"
      )}
    >
      <div
        className={clsx(
          "flex text-sm items-center justify-center gap-x-2 border border-gray-200 p-2 rounded-md w-96 max-w-full",
          containerClassName
        )}
      >
        <button
          className="btn btn-sm btn-square btn-ghost disabled-ghost"
          disabled={!prev}
          onClick={() => setPage(page - 1)}
        >
          <IconWrapper iconSize="medium" className="icon-Arrow-Right-16" />
        </button>
        {prev ? (
          <Fragment>
            <button
              className={clsx(
                "btn btn-sm btn-square rounded-md",
                page !== 0 && "btn-ghost bg-gray-50 text-gray-600 font-light",
                page === 0 && "btn-primary"
              )}
              onClick={() => setPage(0)}
            >
              1
            </button>
            <span>...</span>
          </Fragment>
        ) : null}
        {count
          ? new Array(Math.floor(count / 10))
              .fill(null)
              .map((_, index) => (
                <button
                  key={index}
                  className={clsx(
                    "btn btn-sm btn-square rounded-md",
                    page !== index &&
                      "btn-ghost bg-gray-50 text-gray-600 font-light",
                    page === index && "btn-primary"
                  )}
                  onClick={() => setPage(index)}
                >
                  {index + 1}
                </button>
              ))
              .filter(
                (_, index) =>
                  index >= page - 1 && index <= page + 1 && index >= 0
              )
              .filter((_, index) => {
                if (page === 1 && index === 0) return null;
                return _;
              })
          : null}
        {next ? <span>...</span> : null}

        <button
          className={clsx(
            "btn btn-sm btn-square rounded-md",
            page !== Math.floor(count / 10) &&
              "btn-ghost bg-gray-50 text-gray-600 font-light",
            page === Math.floor(count / 10) && "btn-primary"
          )}
          onClick={() => setPage(Math.floor(count / 10))}
        >
          {String((Math.floor(count / 10) || 0) + 1)}
        </button>

        <button
          className="btn btn-sm btn-square btn-ghost disabled-ghost"
          disabled={!next}
          onClick={() => setPage(page + 1)}
        >
          <IconWrapper iconSize="medium" className="icon-Arrow-Left-16" />
        </button>
      </div>
    </div>
  );
}

export { Pagination };
