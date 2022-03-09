import { Fragment, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NameValue } from "../../types/NameValue";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IProps {
  menuContent: ReactElement; // content to show when not clicked
  dropDownButtons: NameValue[];
  onMenuItemClicked: (dropDownButtonName: string) => void;
}

export default function Dropdown(props: IProps) {
  const { menuContent, dropDownButtons, onMenuItemClicked } = props;
  return (
    <Menu as="div" className="relative inline-block text-left">
      {menuContent}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {dropDownButtons.map((dropDownButton) => {
              return (
                <Menu.Item key={dropDownButton.name}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-black" : "text-gray-800",
                        "block w-full text-left px-4 py-2 text-sm"
                      )}
                      onClick={() => onMenuItemClicked(dropDownButton.name)}
                    >
                      {dropDownButton.value}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
