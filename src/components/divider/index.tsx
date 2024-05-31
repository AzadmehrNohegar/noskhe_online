import clsx from "clsx";
import { HTMLProps } from "react";

interface IDividerProps extends HTMLProps<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

function Divider(props: IDividerProps) {
  const { className, orientation = "vertical", ...rest } = props;

  return (
    <div
      className={clsx(
        orientation === "horizontal" && "h-px border-t border-t-gray-100",
        orientation === "vertical" &&
          "w-px border-r border-r-gray-100 border-dashed",
        className
      )}
      {...rest}
    />
  );
}

export { Divider };
