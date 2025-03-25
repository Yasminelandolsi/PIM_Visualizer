"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

export const MobileDropdown = ({
  label,
  subItems,
}: {
  label: string;
  subItems: DropdownItem[];
}) => {
  return (
    <Menu as="div" className="relative w-full">
      <MenuButton className="w-full rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 flex items-center">
        <p className=" text-start">{label}</p>
        <ChevronDownIcon
          className="h-5 w-5 text-gray-300 ml-auto"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        className="mt-2 w-full origin-top rounded-md bg-[#051e50] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-closed:animate-fade-out data-enter:animate-fade-in"
      >
        <div className="py-1">
          {subItems.map((subItem) => (
            <MenuItem key={subItem.href}>
              <Link
                href={subItem.href}
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                {subItem.label}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};
