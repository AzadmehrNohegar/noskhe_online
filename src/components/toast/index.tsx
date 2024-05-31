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
          type === "primary" && "bg-gray-50 border-r-gray-100",
          type === "secondary" && "bg-secondary-50 border-r-secondary-200",
          type === "info" && "bg-info-50 border-r-info-200",
          type === "error" && "bg-danger-50 border-r-danger-200",
          type === "success" && "bg-success-50 border-r-success-200"
        )}
      >
        <div className="flex items-center w-full justify-between max-w-toast">
          <h6
            className={clsx(
              "w-full flex items-center gap-x-2 text-sm lg:text-base font-bold truncate",
              type === "primary" && "text-primary-600",
              type === "secondary" && "text-secondary-600",
              type === "info" && "text-info-600",
              type === "error" && "text-red-600-600",
              type === "success" && "text-success-600"
            )}
          >
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
