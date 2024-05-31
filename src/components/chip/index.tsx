import { general_status } from "@/model";
import clsx from "clsx";
import { HTMLProps } from "react";

interface IChipProps extends HTMLProps<HTMLSpanElement> {
  status?: general_status;
}

function Chip({ status, className, children, ...rest }: IChipProps) {
  return (
    <span
      className={clsx(
        "chip",
        status === "ready" && "chip-primary",
        status === "success" && "chip-success",
        status === "pending" && "chip-info-light",
        status === "failed" && "chip-danger",
        status === "closed" && "chip-accent",
        status === "revoke" && "chip-accent",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Chip };
