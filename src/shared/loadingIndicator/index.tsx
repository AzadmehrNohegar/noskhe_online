import { useMiscStore } from "@/store/misc";
import { Transition } from "@headlessui/react";

function LoadingIndicator() {
  const { loading, type } = useMiscStore();

  if (type === "mutation")
    return (
      <Transition
        show={loading}
        appear
        as="div"
        className="fixed top-1 left-1/2 w-fit -translate-x-1/2 bg-gray-100 z-[100] flex items-center gap-x-2 text-gray-600 p-1 rounded-md pointer-events-none"
        enter="transition-opacity ease-linear duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <span className="loading loading-spinner loading-sm"></span>
        در حال ارسال اطلاعات
      </Transition>
    );

  return (
    <Transition
      show={loading}
      appear
      as="div"
      className="fixed top-1 left-1/2 w-fit -translate-x-1/2 bg-red z-[100] bg-gray-100 flex items-center gap-x-2 text-gray-600 p-1 rounded-md pointer-events-none"
      enter="transition-opacity ease-linear duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <span className="loading loading-spinner loading-sm"></span>
      در حال دریافت اطلاعات
    </Transition>
  );
}

export { LoadingIndicator };
