import React from 'react';
import { Breadcrumb as MakoBreadcrumb } from "@mako/core";

// You can allow overriding the default items if needed
interface BreadcrumbNavProps {
  items?: Array<{
    href: string;
    label: string;
  }>;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  // Default items if none provided
  const defaultItems = [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/Category',
      label: 'Category'
    },
    {
      href: '/Product/id',
      label: 'Product_id'
    }
  ];

  // Use provided items or defaults
  const breadcrumbItems = items || defaultItems;

  return (
    <div className="px-2">
      <div className="max-w-6xl mx-auto py-4">
        <MakoBreadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
};

export default BreadcrumbNav;