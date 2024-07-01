import { Divider } from "@/components/divider";
import { Dropdown, DropdownButton } from "@/components/dropdown";
import { IconWrapper } from "@/shared/iconWrapper";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { MobileSlideover } from "@/shared/mobileSlideover";
import { useMediaQuery } from "usehooks-ts";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { useQuery } from "react-query";
import { getUserProfile } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import Skeleton from "react-loading-skeleton";
import { useToastStore } from "@/store/toast";
import { useAddressStore } from "@/store/address";
import { SelectAddressDialog } from "@/shared/selectAddress";
import { useMiscStore } from "@/store/misc";

function CustomerLayoutHeader() {
  const [isMobileSlideoverOpen, setIsMobileSlideoverOpen] = useState(false);

  const { addressDialogOpen, setIsAddressDialogOpen } = useMiscStore();

  const { logoutUser } = useAuthStore();
  const { stackToast } = useToastStore();
  const { address } = useAddressStore();

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
          <Link to="/" className="me-auto">
            <img src="/logo.png" width={100} height={32} alt="logo" />
          </Link>

          <Link
            to="/wallet"
            className="flex items-center rounded-md bg-secondary-10 border border-secondary-200 px-2 py-1 h-fit my-auto me-2 w-1/2"
          >
            <IconWrapper iconSize="medium" className="icon-Wallet-16" />
            <strong className="ms-auto text-sm text-red-600 min-w-16 text-end">
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
          <button
            className="btn btn-ghost px-0 w-fit aspect-auto"
            onClick={() => setIsAddressDialogOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 297 297"
            >
              <g>
                <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z" />
                <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z" />
              </g>
            </svg>
          </button>
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
        <SelectAddressDialog
          isOpen={addressDialogOpen || !address}
          closeModal={() => setIsAddressDialogOpen(false)}
        />
      </Fragment>
    );

  return (
    <Fragment>
      <header className="p-5 sticky z-10 top-0 border-b border-b-gray-100 w-full bg-white flex items-stretch gap-3">
        <Breadcrumbs className="me-auto" />
        <Link
          to="/wallet"
          className="flex items-center rounded-md bg-secondary-10 border border-secondary-200 text-sm px-3 py-2 min-w-72"
        >
          <span>اعتبار کیف پول</span>
          <strong className="ms-auto text-base text-red-600 min-w-24 text-end">
            {isLoading ? (
              <Skeleton width={60} inline className="h-full" />
            ) : null}
            {!isLoading
              ? Number(
                  userData?.data.data.user[0].walletBalance
                ).toLocaleString()
              : null}{" "}
            <span className="text-sm font-light text-gray-500">ریال</span>
          </strong>
        </Link>
        <button
          className="flex items-center rounded-md bg-secondary-10 border border-secondary-200 text-sm px-3 py-2 max-w-72 gap-2"
          onClick={() => setIsAddressDialogOpen(true)}
        >
          <span>آدرس</span>
          <strong className="ms-auto text-xs text-gray-800 w-full text-end line-clamp-1">
            {address ? address!.address : null}{" "}
          </strong>
        </button>
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
      <SelectAddressDialog
        isOpen={addressDialogOpen || !address}
        closeModal={() => setIsAddressDialogOpen(false)}
      />
    </Fragment>
  );
}

export { CustomerLayoutHeader };
