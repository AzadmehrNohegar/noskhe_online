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
        status === "SUCCESS" && "chip-success",
        status === "PENDING" && "chip-info-light",
        status === "FAILED" && "chip-danger",
        status === "closed" && "chip-accent",
        status === "revoke" && "chip-accent",
        status === "WAITING" && "chip-success",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Chip };
