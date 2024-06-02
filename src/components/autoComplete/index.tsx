import React, { PropsWithChildren, forwardRef } from "react";
import { Input } from "../input";
import { IInputProps } from "@/model";
import clsx from "clsx";

const Autocomplete = forwardRef(
  (
    { value, children, className, ...rest }: IInputProps & PropsWithChildren,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="dropdown">
        <Input value={value} className={clsx(className)} ref={ref} {...rest} />
        <div className="dropdown-content bg-white w-full border border-gray-100 mt-1 max-h-64 overflow-y-auto flex-nowrap rounded-md z-[1] menu p-2">
          {children}
        </div>
      </div>
    );
  }
);

export { Autocomplete };
