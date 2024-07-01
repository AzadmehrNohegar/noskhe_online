import { navLink } from "@/constants/misc";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

function SidebarLiWithoutSubmenu({ end, icon, label, to }: navLink) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          clsx(
            "btn p-2 rounded-lg flex items-center gap-3 justify-start min-w-max",
            isActive &&
              "btn-primary relative before:absolute before:-start-5 before:w-2 before:h-1/2 before:inset-y-auto before:bg-primary before:rounded-l-md text-white",
            !isActive && "btn-ghost"
          )
        }
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

export { SidebarLiWithoutSubmenu };
