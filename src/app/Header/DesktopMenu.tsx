"use client";

import Dropdown from "./Dropdown";

interface MenuItem {
  label: string;
  subItems: { label: string; href: string }[];
}

const DesktopMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <div className="hidden sm:ml-1 sm:block">
      <nav className="bg-[#051e50] pr-1">
        <div className="flex gap-0 -ml-1">
          {menuItems.map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              items={item.subItems}
              linkClass="rounded px-1 py-1 text-[8px] font-bold text-gray-300 hover:bg-gray-700 hover:text-white"
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DesktopMenu;