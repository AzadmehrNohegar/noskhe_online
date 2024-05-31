import { IconWrapper } from "@/shared/iconWrapper";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  containerClassName?: string;
  label?: string;
  elementEnd?: React.ReactNode;
  block?: boolean;
  isLabelAbsolute?: boolean;
  astrisk?: boolean;
  iconClassName?: string;
  deleteAction?: () => void;
}

const Input = forwardRef(
  (props: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      error,
      className,
      containerClassName,
      elementEnd = null,
      block = true,
      label,
      id,
      iconClassName,
      isLabelAbsolute = false,
      astrisk,
      placeholder,
      deleteAction,
      ...rest
    } = props;

    const inputId = useId();

    return (
      <div
        className={clsx(
          "flex items-start flex-col",
          block && " w-full",
          containerClassName
        )}
      >
        {label ? (
          <label htmlFor={id || inputId} className="label label-text">
            <span className="text-gray-600 text-xs">{label}</span>
          </label>
        ) : null}
        <div className={clsx("flex items-center relative", block && " w-full")}>
          <input
            id={id || inputId}
            ref={ref}
            className={clsx(
              className,
              "peer focus:outline-none transition-colors h-10 lg:h-12 text-sm lg:text-base placeholder:text-gray-400",
              error && "focus:bg-info-50 border-red-600",
              !error && "focus:bg-info-50 focus:border-info",
              astrisk && "placeholder-shown:pr-7"
            )}
            placeholder={placeholder}
            {...rest}
          />
          {/* {placeholder ? (
            <span className="absolute start-4 top-1/2 -translate-y-1/2 -z-10 text-gray-500 peer-[&:not(:placeholder-shown)]:bg-transparent peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:z-10 peer-[&:not(:placeholder-shown)]:text-xs transition-all duration-200 before:absolute before:bg-transparent before:w-full before:h-1/2 before:top-px before:-z-[1]">
              {placeholder}
            </span>
          ) : null} */}
          {astrisk ? (
            <span className="absolute start-4 inset-y-auto z-10 text-xs text-red-600 peer-[&:not(:placeholder-shown)]:hidden">
              *
            </span>
          ) : null}
          {deleteAction ? (
            <button
              type="button"
              className="peer-placeholder-shown:invisible absolute end-12 inset-y-auto text-gray-600 inline-flex items-center"
              onClick={deleteAction}
              tabIndex={-1}
            >
              <IconWrapper iconSize="medium" className="icon-Close-16" />
            </button>
          ) : null}
          {iconClassName ? (
            <span className="absolute end-3 inset-y-auto text-gray-600 ps-2 border-r border-r-gray-200">
              <IconWrapper iconSize="medium" className={iconClassName} />
            </span>
          ) : null}

          {elementEnd ? elementEnd : null}
        </div>

        <Transition show={!!error}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <label
              className={clsx("label pb-0", isLabelAbsolute && "absolute")}
            >
              <span className="text-red-600 text-xs">{error?.message}</span>
            </label>
          </Transition.Child>
        </Transition>
      </div>
    );
  }
);

export { Input };
