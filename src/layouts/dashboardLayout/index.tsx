import { Outlet } from "react-router-dom";
import { DashboardLayoutSidebar } from "./partials/sidebar";
import { DashboardLayoutHeader } from "./partials/header";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

function DashboardLayout() {
  return (
    <main className="min-h-svh flex items-stretch">
      <DashboardLayoutSidebar />
      <section className="flex flex-col relative min-h-full w-full lg:max-w-[83%]">
        <DashboardLayoutHeader />

        <section className="p-4 lg:p-5 h-full overflow-x-auto">
          <Suspense
            fallback={
              <Skeleton
                className="block h-full"
                containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
              />
            }
          >
            <Outlet />
          </Suspense>
        </section>
      </section>
    </main>
  );
}

export { DashboardLayout };
