import { SIDEBAR_ITEMS } from "@/constants/misc";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { SidebarLiWithSubmenu } from "./partials/sidebarLiWithSubmenu";
import { SidebarLiWithoutSubmenu } from "./partials/sidebarLiWithoutSubmenu";

function DashboardLayoutSidebar() {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches) return null;

  return <DashboardLayoutSidebarComponent />;
}

function DashboardLayoutSidebarComponent() {
  return (
    <aside className="w-[17%] h-svh bg-white flex flex-col gap-6 rounded-bl-2xl p-5 sticky top-0">
      <Link to="/" className="flex items-center gap-2 mx-auto">
        <img
          src="/logo.png"
          width="100%"
          height={90}
          className="object-contain"
          alt="logo"
        />
      </Link>

      <ul className="flex flex-col gap-3">
        {SIDEBAR_ITEMS.map((item) => {
          if (item.submenu)
            return <SidebarLiWithSubmenu key={item.to} {...item} />;
          return <SidebarLiWithoutSubmenu key={item.to} {...item} />;
        })}
      </ul>
    </aside>
  );
}

export { DashboardLayoutSidebar };
