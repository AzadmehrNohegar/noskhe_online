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
        status === "SUCCESS" && "chip-success",
        status === "PENDING" && "chip-info-light",
        status === "FAILED" && "chip-danger",
        status === "WAITING" && "chip-success",
        status === "PAID" && "chip-primary",
        status === "DELIVERED" && "chip-primary",
        status === "SENT" && "chip-primary",
        status === "WFP" && "chip-info-light",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Chip };
