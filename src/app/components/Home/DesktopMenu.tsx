"use client";

import Dropdown from "./Dropdown";

interface MenuItem {
  label: string;
  href: string;  // Add this property for main category URL
  subItems: { label: string; href: string }[];
}

const DesktopMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <div className="hidden xl:block w-full">
      <nav className="bg-[#051e50] px-4">
        <div className="flex items-center justify-center space-x-4 text-center">
          {menuItems.map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              mainHref={item.href}  // Pass the href as mainHref
              items={item.subItems}
              linkClass="text-center rounded px-2 md:text-sm font-bold text-gray-300 hover:bg-gray-700 hover:text-white"
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DesktopMenu;