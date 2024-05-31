import { REGISTER_STEPS, REGISTER_STEPS_LABELS } from "@/constants/misc";
import { useRegisterStore } from "@/store/register";
import clsx from "clsx";
import { HTMLProps } from "react";
import { IconWrapper } from "@/shared/iconWrapper";

function RegisterStepper({ className, ...rest }: HTMLProps<HTMLDivElement>) {
  const { currentStep, steps } = useRegisterStore();

  return (
    <div
      className={clsx(
        "flex items-start justify-between border-b border-b-gray-100 py-6",
        className
      )}
      {...rest}
    >
      {REGISTER_STEPS.map((item) => {
        const currPos = steps.indexOf(currentStep);
        const itemPos = steps.indexOf(item);
        return (
          <div key={item} className="w-full flex flex-col gap-2 group">
            <div
              className={clsx(
                "w-full relative flex flex-col items-center justify-center before:absolute before:h-px before:w-1/2 before:start-0 after:absolute after:h-px after:w-1/2 after:end-0 group-first-of-type:before:hidden group-last-of-type:after:hidden",
                currPos < itemPos && "before:bg-gray-100 after:bg-gray-100",
                currPos >= itemPos && "before:bg-secondary after:bg-secondary"
              )}
            >
              <span
                className={clsx(
                  "inline-flex items-center justify-center relative z-10 text-xs lg:text-sm border rounded-full aspect-square h-5 lg:h-6",
                  currPos < itemPos && "border-gray-200 bg-transparent",
                  currPos >= itemPos && "border-secondary bg-secondary"
                )}
              >
                {currPos < itemPos ? `${itemPos + 1}` : null}
                {currPos === itemPos ? (
                  <span className="h-2.5 lg:h-3 aspect-square rounded-full bg-transparent" />
                ) : null}
                {currPos > itemPos ? (
                  <IconWrapper
                    iconSize="medium"
                    className="icon-Tick16 text-white"
                  />
                ) : null}
              </span>
            </div>
            <span
              className={clsx(
                "text-xs lg:text-sm text-center transition-all",
                currPos >= itemPos && "font-semibold text-secondary"
              )}
            >
              {REGISTER_STEPS_LABELS[item]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { RegisterStepper };
