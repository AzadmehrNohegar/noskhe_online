import { navLink } from "@/constants/misc";
import { IconWrapper } from "@/shared/iconWrapper";
import { useAuthStore } from "@/store/auth";
import { useIsCurrentEndpoint } from "@/utils/useIsCurrentEndpoint";
import clsx from "clsx";
import { useId, useRef } from "react";
import { NavLink } from "react-router-dom";
// import { useOnClickOutside } from "usehooks-ts";

interface IMobileSlideoverLiWithSubmenuProps extends navLink {
  closeModal: () => void;
}

function MobileSlideoverLiWithSubmenu({
  icon,
  label,
  to,
  submenu,
  closeModal,
}: IMobileSlideoverLiWithSubmenuProps) {
  const { isCurrentEndpoint } = useIsCurrentEndpoint();
  const elementId = useId();

  const checkboxRef = useRef<HTMLInputElement>(null);
  const elementRef = useRef<HTMLLIElement>(null);

  const { role } = useAuthStore();

  return (
    <li tabIndex={0} className="group" ref={elementRef}>
      <input
        id={elementId}
        ref={checkboxRef}
        className="hidden"
        type="checkbox"
      />
      <label
        htmlFor={elementId}
        className={clsx(
          "btn btn-custom p-2 rounded-xl flex items-center gap-3 justify-start",
          isCurrentEndpoint(to) &&
            role === "CUSTOMER" &&
            "btn-primary relative before:absolute before:-start-5 before:w-2 before:h-1/2 before:inset-y-auto before:bg-primary before:rounded-l-md",
          isCurrentEndpoint(to) &&
            role === "PHARMACY" &&
            "btn-secondary relative before:absolute before:-start-5 before:w-2 before:h-1/2 before:inset-y-auto before:bg-secondary before:rounded-l-md",
          !isCurrentEndpoint(to) && "btn-ghost"
        )}
      >
        {icon(isCurrentEndpoint(to))}
        {label}
        <IconWrapper
          iconSize="large"
          className="icon-Arrow-Down-16 inline-block ms-auto group-has-[:checked]:rotate-180 transition-transform"
        />
      </label>
      <ul
        className={clsx(
          "py-2 hidden group-has-[:checked]:flex flex-col gap-y-2"
        )}
      >
        {submenu!.map((el) => (
          <NavLink
            key={el.to}
            to={el.to}
            className={({ isActive }) =>
              clsx(
                "btn btn-block btn-custom justify-start rounded-xl text-xs",
                !isActive && "btn-ghost text-gray-700 font-light",
                isActive &&
                  role === "CUSTOMER" &&
                  "btn-ghost relative bg-primary-100 text-primary text-start",
                isActive &&
                  role === "PHARMACY" &&
                  "btn-ghost relative bg-secondary-100 text-secondary text-start"
              )
            }
            onClick={closeModal}
          >
            {el.label}
          </NavLink>
        ))}
      </ul>
    </li>
  );
}

export { MobileSlideoverLiWithSubmenu };
