import { ICON_SIZE, iconSize } from "@/model";
import clsx from "clsx";
import type { HTMLProps } from "react";

interface IIconWrapperProps extends HTMLProps<HTMLSpanElement> {
  className: string;
  iconSize: iconSize;
}

function IconWrapper(props: IIconWrapperProps) {
  const { iconSize, className, ...rest } = props;

  return (
    <span className={clsx(className, ICON_SIZE[iconSize])} {...rest}>
      <span className="path1"></span>
      <span className="path2"></span>
      <span className="path3"></span>
      <span className="path4"></span>
      <span className="path5"></span>
      <span className="path6"></span>
      <span className="path7"></span>
      <span className="path8"></span>
    </span>
  );
}

export { IconWrapper };
