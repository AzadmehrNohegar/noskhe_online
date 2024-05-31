import { Divider } from "@/components/divider";
import { Dropdown, DropdownButton } from "@/components/dropdown";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { MobileSlideover } from "@/shared/mobileSlideover";
import { useMediaQuery } from "usehooks-ts";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { useQuery } from "react-query";
import { getUserProfile } from "@/api/membership";
import { useAuthStore } from "@/store/auth";
import Skeleton from "react-loading-skeleton";
import { useToastStore } from "@/store/toast";

function DashboardLayoutHeader() {
  const [isMobileSlideoverOpen, setIsMobileSlideoverOpen] = useState(false);

  const { logoutUser } = useAuthStore();
  const { stackToast } = useToastStore();

  const { data: userData, isLoading } = useQuery("user-profile", () =>
    getUserProfile()
  );

  const handleLogout = () => {
    stackToast({
      title: "شما از حساب کاربری خود خارج شدید.",
      options: {
        type: "info",
      },
    });
    logoutUser();
  };

  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches)
    return (
      <Fragment>
        <header className="px-4 py-2.5 gap-2 sticky z-10 top-0 border-b border-b-gray-100 w-full bg-white flex items-center">
          <Link to="/">
            <img src="/logo.png" width={100} height={32} alt="logo" />
          </Link>
          <Link
            to="/wallet"
            className="flex items-center rounded-md bg-secondary-10 border border-secondary-200 px-2 py-1 ms-auto h-fit my-auto me-2 w-1/2"
          >
            <IconWrapper iconSize="medium" className="icon-Wallet-16" />
            <strong className="ms-auto text-sm text-secondary min-w-16 text-end">
              {isLoading ? (
                <Skeleton width={60} inline className="h-full" />
              ) : null}
              {!isLoading
                ? Number(
                    userData?.data.data.user[0].walletBalance
                  ).toLocaleString()
                : null}{" "}
              <span className="text-xs font-light text-gray-500">ریال</span>
            </strong>
          </Link>
          <Divider className="h-5 my-auto" />
          <Dropdown
            dropdownButton={
              <DropdownButton className="btn btn-ghost px-0 w-fit aspect-auto">
                <IconWrapper iconSize="large" className="icon-User-16" />
              </DropdownButton>
            }
            dropdownContainerClassName="p-2 min-w-max"
          >
            <Link to="/profile" className="btn btn-ghost btn-block font-light">
              <IconWrapper iconSize="large" className="icon-User-16" />
              مشاهده حساب کاربری
            </Link>
            <button
              className="btn btn-ghost btn-block justify-start text-red-600 font-light"
              onClick={handleLogout}
            >
              <IconWrapper iconSize="large" className="icon-Logout-16" />
              خروج از حساب کاربری
            </button>
          </Dropdown>
          <Divider className="h-5 my-auto" />
          <button
            className="btn btn-ghost px-0 w-fit aspect-auto"
            onClick={() => setIsMobileSlideoverOpen(true)}
          >
            <IconWrapper iconSize="large" className="icon-Hamburger-Menu" />
          </button>
        </header>
        <MobileSlideover
          isOpen={isMobileSlideoverOpen}
          closeModal={() => setIsMobileSlideoverOpen(false)}
        />
      </Fragment>
    );

  return (
    <header className="p-5 sticky z-10 top-0 border-b border-b-gray-100 w-full bg-white flex items-stretch gap-3">
      <Breadcrumbs />
      <Link
        to="/wallet"
        className="flex items-center rounded-md bg-secondary-10 border border-secondary-200 text-sm px-3 py-2 ms-auto min-w-72"
      >
        <span>اعتبار کیف پول</span>
        <strong className="ms-auto text-base text-secondary min-w-24 text-end">
          {isLoading ? <Skeleton width={60} inline className="h-full" /> : null}
          {!isLoading
            ? Number(userData?.data.data.user[0].walletBalance).toLocaleString()
            : null}{" "}
          <span className="text-sm font-light text-gray-500">ریال</span>
        </strong>
      </Link>
      <Divider />
      <Dropdown
        dropdownButton={
          <DropdownButton className="flex rounded-md gap-2 px-3 py-1 items-center border border-gray-200">
            <IconWrapper iconSize="large" className="icon-User-16" />
            {isLoading ? <Skeleton width={120} className="h-full" /> : null}
            {!isLoading ? `${userData?.data.data.user[0].fullName}` : null}
          </DropdownButton>
        }
        dropdownContainerClassName="p-2 min-w-max"
      >
        <Link to="/profile" className="btn btn-ghost btn-block font-light">
          <IconWrapper iconSize="large" className="icon-User-16" />
          مشاهده حساب کاربری
        </Link>
        <button
          className="btn btn-ghost btn-block justify-start text-red-600 font-light"
          onClick={handleLogout}
        >
          <IconWrapper iconSize="large" className="icon-Logout-16" />
          خروج از حساب کاربری
        </button>
      </Dropdown>
    </header>
  );
}

export { DashboardLayoutHeader };
