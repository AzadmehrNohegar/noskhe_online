import { toast } from "@/model";
import { useToastStore } from "@/store/toast";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

interface IToastProps {
  toast: toast;
  index: number;
}

function Toast({ toast }: IToastProps) {
  const {
    id,
    message,
    title,
    options: { type },
  } = toast;

  const { deleteToast } = useToastStore();

  const [show, setShow] = useState(true);

  useEffect(() => {
    const hideInterval = setTimeout(() => setShow(false), 2500);
    const removeInterval = setTimeout(() => deleteToast(id), 3000);
    return () => {
      clearInterval(hideInterval);
      clearTimeout(removeInterval);
    };
  }, [deleteToast, id]);

  return (
    <Transition
      appear
      show={show}
      as={Fragment}
      enter="transition-all duration-500"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-all duration-500"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div
        className={clsx(
          "border-r-8 p-4 rounded-xl flex flex-col justify-start gap-y-4",
          type === "primary" && "bg-primary border-r-gray-100",
          type === "secondary" && "bg-secondary border-r-secondary-200",
          type === "info" && "bg-info border-r-info-200",
          type === "error" && "bg-error border-r-danger-200",
          type === "success" && "bg-success border-r-success-200"
        )}
      >
        <div className="flex items-center w-full justify-between max-w-toast">
          <h6 className="w-full flex items-center gap-x-2 text-sm lg:text-base font-bold truncate text-white">
            {title}
          </h6>
        </div>
        {message ? (
          <p className="text-justify text-gray-600 text-xs lg:text-sm line-clamp-1">
            {message}
          </p>
        ) : null}
      </div>
    </Transition>
  );
}

export { Toast };
