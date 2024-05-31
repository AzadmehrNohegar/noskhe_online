import { navLink } from "@/constants/misc";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import clsx from "clsx";

interface IMobileSlideoverLiWithoutSubmenuProps extends navLink {
  closeModal: () => void;
}

function MobileSlideoverLiWithoutSubmenu({
  end,
  icon,
  label,
  to,
  closeModal,
}: IMobileSlideoverLiWithoutSubmenuProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          clsx(
            "btn btn-custom p-2 rounded-xl flex items-center gap-3 justify-start",
            isActive &&
              "btn-primary relative before:absolute before:-start-5 before:w-2 before:h-1/2 before:inset-y-auto before:bg-primary before:rounded-l-md",
            !isActive && "btn-ghost"
          )
        }
        onClick={closeModal}
      >
        {({ isActive }) => (
          <Fragment>
            {icon(isActive)}
            <span>{label}</span>
          </Fragment>
        )}
      </NavLink>
    </li>
  );
}

export { MobileSlideoverLiWithoutSubmenu };
