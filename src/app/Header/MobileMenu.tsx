"use client";

import { MobileDropdown } from './MobileDropdown';

interface MenuItemType {
  label: string;
  subItems: DropdownItem[];
}

interface DropdownItem {
  label: string;
  href: string;
}

const MobileMenu = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {menuItems.map((item) => (
          <MobileDropdown
            key={item.label}
            label={item.label}
            subItems={item.subItems}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;