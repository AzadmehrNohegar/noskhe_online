import {
  ButtonHTMLAttributes,
  Fragment,
  ReactNode,
  Ref,
  forwardRef,
  useId,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

interface IDropdownProps {
  orientation?: "left" | "right";
  dropdownContainerClassName?: string;
  dropdownButton: ReactNode;
  children: ReactNode[];
}

const DropdownButton = forwardRef(function (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>
) {
  return <Menu.Button as="button" ref={ref} {...props}></Menu.Button>;
});

function Dropdown({
  orientation = "left",
  dropdownContainerClassName,
  dropdownButton,
  children,
}: IDropdownProps) {
  const uniqID = useId();

  return (
    <Menu as="div" className="relative inline-block text-left">
      {dropdownButton}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute mt-2 w-fit bg-white divide-y divide-gray-100 rounded-md bg-transparent shadow-lg focus:outline-none",
            orientation === "left" && "origin-top-left left-0",
            orientation === "right" && "origin-top-right right-0",
            dropdownContainerClassName
          )}
        >
          {children?.map((el, index) => (
            <Menu.Item
              key={`${uniqID}-${index}`}
              as="div"
              className="hover:bg-gray-100 transition-colors"
            >
              {el}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export { Dropdown, DropdownButton };
