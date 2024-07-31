import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import clsx from "clsx";
import { IDictionary } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";

interface IListProps {
  variant?: "primary" | "secondary";
  containerClassName?: string;
  options: string[];
  optionDictionary: IDictionary<string>;
  selected: string | null;
  setSelected: (option: string) => void;
  label?: string;
  bordered?: boolean;
  searchComponent?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

function StatelessSelect({
  containerClassName,
  options,
  selected,
  setSelected,
  label,
  variant = "primary",
  bordered = true,
  searchComponent,
  optionDictionary,
  placeholder,
}: IListProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div
        className={clsx(
          "relative bg-white",
          !containerClassName && "max-w-[300px] min-w-[200px]",
          containerClassName
        )}
      >
        {label ? (
          <Listbox.Label className="label label-text">
            <span className="text-gray-600 text-xs">{label}</span>
          </Listbox.Label>
        ) : null}

        <Listbox.Button
          className={clsx(
            "relative w-full text-start cursor-default rounded-md min-h-10 lg:min-h-[46px] ps-4 pe-10 focus:outline-none focus:border-info text-sm overflow-x-auto transition-colors",
            bordered && "border border-dUI border-opacity-20 focus:border-info"
          )}
        >
          <span
            className={clsx(
              "inline-flex items-center gap-x-2 truncate",
              !selected && "text-gray-400"
            )}
          >
            {!selected ? placeholder || "یک گزینه را انتخاب کنید." : null}
            {optionDictionary[selected!] || selected}
          </span>
          <span className="pointer-events-none absolute h-fit top-1/2 -translate-y-1/2 end-3 flex items-center ps-2 text-gray-600">
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
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none">
            {searchComponent}
            {options?.map((option) => (
              <Listbox.Option
                key={option}
                className={({ selected }) =>
                  `relative flex items-center gap-x-4 cursor-default select-none py-2 pl-10 pr-4 ${
                    selected
                      ? variant === "secondary"
                        ? "bg-slate-100 text-gray-900"
                        : "bg-slate-100 text-primary-900"
                      : "text-gray-900"
                  }`
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
                        selected && "font-semibold",
                        !selected && "font-base"
                      )}
                    >
                      {optionDictionary[option]}
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

export { StatelessSelect };
