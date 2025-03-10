"use client";

import Dropdown from "./Dropdown";

interface MenuItem {
  label: string;
  subItems: { label: string; href: string }[];
}

const DesktopMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <div className="hidden sm:block w-full">
      <nav className="bg-[#051e50] px-4">
        <div className="flex justify-start space-x-4">
          {menuItems.map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              items={item.subItems}
              linkClass="rounded px-3 py-2 text-sm md:text-base font-bold text-gray-300 hover:bg-gray-700 hover:text-white"
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DesktopMenu;
