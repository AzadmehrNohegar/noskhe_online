import clsx from "clsx";
import { DoubleArrowRight } from "@/assets/icons/DoubleArrowRight";
import { ArrowRight } from "@/assets/icons/ArrowRight";
import { ArrowLeft } from "@/assets/icons/ArrowLeft";
import { DoubleArrowLeft } from "@/assets/icons/DoubleArrowLeft";

interface IPaginationProps {
  page: string;
  count: number;
  setPage: (val: string) => void;
  next: string | boolean | null;
  prev: string | boolean | null;
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
          className="btn btn-sm btn-square shadow-none !w-9 !min-w-9 !h-9 !min-h-9 btn-ghost disabled-ghost"
          disabled={!prev}
          onClick={() => setPage("1")}
        >
          <DoubleArrowRight />
        </button>
        <button
          className="btn btn-sm btn-square shadow-none !w-9 !min-w-9 !h-9 !min-h-9 btn-ghost disabled-ghost"
          disabled={!prev}
          onClick={() => setPage(`${+page - 1}`)}
        >
          <ArrowRight />
        </button>
        {count
          ? new Array(Math.ceil(count / 10))
              .fill(null)
              .map((_, index) => (
                <button
                  key={index}
                  className={clsx(
                    "btn btn-sm btn-square shadow-none !w-9 !min-w-9 !h-9 !min-h-9 rounded-md",
                    +page !== index + 1 &&
                      "btn-ghost bg-grey-50 text-grey-600 font-light hover:bg-secondary hover:text-white",
                    +page === index + 1 &&
                      "bg-secondary text-white border-secondary hover:bg-secondary hover:bg-opacity-50 hover:border-opacity-50"
                  )}
                  onClick={() => setPage(`${index + 1}`)}
                >
                  {index + 1}
                </button>
              ))
              .filter(
                (_, index) =>
                  index >= +page - 1 && index <= +page + 1 && index >= 0
              )
          : null}

        <button
          className="btn btn-sm btn-square shadow-none !w-9 !min-w-9 !h-9 !min-h-9 btn-ghost disabled-ghost"
          disabled={!next}
          onClick={() => setPage(`${+page + 1}`)}
        >
          <ArrowLeft />
        </button>
        <button
          className="btn btn-sm btn-square shadow-none !w-9 !min-w-9 !h-9 !min-h-9 btn-ghost disabled-ghost"
          disabled={!next}
          onClick={() => setPage(`${Math.ceil(count / 10)}`)}
        >
          <DoubleArrowLeft />
        </button>
      </div>
    </div>
  );
}

export { Pagination };
