import { SIDEBAR_ITEMS } from "@/constants/misc";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery, useScrollLock } from "usehooks-ts";
import { IconWrapper } from "@/shared/iconWrapper";
import { Divider } from "@/components/divider";
import { IExtendedDialogProps } from "@/model";
import { MobileSlideoverLiWithSubmenu } from "./partials/mobileSlideoverLiWithSubmenu";
import { MobileSlideoverLiWithoutSubmenu } from "./partials/mobileSlideoverLiWithoutSubmenu";

function MobileSlideover(props: IExtendedDialogProps) {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (!matches) return null;

  return <MobileSlideoverComponent {...props} />;
}

function MobileSlideoverComponent({
  isOpen,
  closeModal,
}: IExtendedDialogProps) {
  useScrollLock({
    autoLock: isOpen,
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="fixed z-30 inset-0 overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 xl:duration-700"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 xl:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex h-full flex-col overflow-y-auto bg-gray-50">
            <div className="flex items-stretch gap-3 px-5 py-3 border-b border-b-gray-100">
              <Link to="/" className="flex items-center gap-2 me-auto">
                <img src="/logo.png" width={44} height={44} alt="logo" />
              </Link>
              <Divider />
              <button
                className="btn btn-link px-0 aspect-auto text-gray-600 w-fit"
                onClick={closeModal}
              >
                <IconWrapper iconSize="large" className="icon-Close-16" />
              </button>
            </div>

            <ul className="flex flex-col gap-3 p-5">
              {SIDEBAR_ITEMS.map((item) => {
                if (item.submenu)
                  return (
                    <MobileSlideoverLiWithSubmenu
                      key={item.to}
                      closeModal={closeModal}
                      {...item}
                    />
                  );
                return (
                  <MobileSlideoverLiWithoutSubmenu
                    key={item.to}
                    closeModal={closeModal}
                    {...item}
                  />
                );
              })}
            </ul>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
}

export { MobileSlideover };
