import { Listbox, Transition } from "@headlessui/react";
import { listOption } from "@/model";
import React, { Fragment } from "react";
import clsx from "clsx";
import { IconWrapper } from "@/shared/iconWrapper";

interface IListProps {
  variant?: "primary" | "secondary";
  containerClassName?: string;
  options: listOption[];
  selected: listOption | null;
  setSelected: (option: listOption | null) => void;
  label?: string;
  bordered?: boolean;
  searchComponent?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
}

function RadioSelect({
  containerClassName,
  options,
  selected,
  setSelected,
  label,
  variant = "primary",
  bordered = true,
  searchComponent,
  required,
  placeholder,
}: IListProps) {
  return (
    <Listbox value={selected} by="id" onChange={setSelected}>
      <div
        className={clsx(
          "relative bg-transparent",
          !containerClassName && "max-w-[300px] min-w-[200px]",
          containerClassName
        )}
      >
        <Listbox.Label className="text-gray-500 text-xs">{label}</Listbox.Label>
        <Listbox.Button
          className={clsx(
            "relative w-full text-start cursor-default rounded-md min-h-[46px] ps-4 pe-10 focus:outline-none focus:border-info text-sm overflow-x-auto transition-colors",
            bordered && "border border-dUI border-opacity-20 focus:border-info"
          )}
        >
          <span
            className={clsx(
              "inline-flex items-center gap-x-2 truncate plaintext",
              !selected && "text-gray-400"
            )}
          >
            {!selected && required ? (
              <span className="text-red-600">*</span>
            ) : null}
            {!selected ? placeholder || "یک گزینه را انتخاب کنید." : null}
            {selected?.label}
          </span>
          <span className="pointer-events-none absolute h-fit top-1/2 -translate-y-1/2 end-3 flex items-center ps-2 border-r border-r-gray-200 text-gray-600">
            <IconWrapper
              iconSize="medium"
              className="icon-Arrow-Down-16"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-transparent py-1 text-base shadow-lg focus:outline-none">
            {searchComponent}
            {options?.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ selected }) =>
                  clsx(
                    "relative flex items-center gap-x-4 select-none py-2 pl-10 pr-4 cursor-pointer transition-all",
                    selected &&
                      variant === "secondary" &&
                      "bg-gray-500 text-gray-900 hover:bg-gray-200",
                    selected &&
                      variant === "primary" &&
                      "bg-primary-100 hover:bg-primary-200 text-primary-900",
                    !selected &&
                      variant === "primary" &&
                      "text-gray-900 hover:bg-primary-10",
                    !selected &&
                      variant === "secondary" &&
                      "text-gray-900 hover:bg-gray-50"
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <Fragment>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full border relative",
                        selected &&
                          variant === "secondary" &&
                          "border-secondary before:absolute before:w-[80%] before:h-[80%] before:inset-[10%] before:bg-secondary before:rounded-full",
                        selected &&
                          variant === "primary" &&
                          "border-primary before:absolute before:w-[80%] before:h-[80%] before:inset-[10%] before:bg-primary before:rounded-full",
                        !selected && "border-dUI border-opacity-20"
                      )}
                    />
                    <span
                      className={clsx(
                        "plaintext",
                        selected && "font-semibold",
                        !selected && "font-base"
                      )}
                    >
                      {option.label}
                    </span>
                  </Fragment>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export { RadioSelect };
