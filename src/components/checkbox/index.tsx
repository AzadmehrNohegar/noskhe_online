import clsx from "clsx";
import { ReactNode } from "react";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  containerClassName?: string;
}

function Checkbox(props: ICheckboxProps) {
  const { label, containerClassName, className, ...rest } = props;

  return (
    <label
      className={clsx(
        "label cursor-pointer inline-flex flex-row-reverse items-center gap-x-2",
        containerClassName
      )}
    >
      {label ? <span className="label-text">{label}</span> : null}
      <input type="checkbox" className={clsx(className)} {...rest} />
    </label>
  );
}

export { Checkbox };
