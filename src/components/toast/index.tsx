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
          "p-4 text-white rounded-xl flex flex-col justify-start gap-y-4",
          type === "primary" && "bg-primary",
          type === "secondary" && "bg-secondary",
          type === "info" && "bg-info",
          type === "error" && "bg-error",
          type === "success" && "bg-success"
        )}
      >
        <div className="flex items-center w-full justify-between max-w-toast">
          <h6 className="w-full flex items-center gap-x-2 text-sm lg:text-base font-bold truncate">
            {title}
          </h6>
        </div>
        {message ? (
          <p className="text-justify text-xs lg:text-sm line-clamp-1">
            {message}
          </p>
        ) : null}
      </div>
    </Transition>
  );
}

export { Toast };
