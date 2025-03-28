import React from 'react';
import { Breadcrumb as MakoBreadcrumb } from "@mako/core";
import { productData } from '../../mockData/productData';

interface BreadcrumbNavProps {
  items?: Array<{
    href: string;
    label: string;
  }>;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  const defaultItems = [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/Category',
      label: productData.category
    },
    {
      href: `/Product/${productData.euReference}`,
      label: `${productData.name} (${productData.euReference})`
    }
  ];

  const breadcrumbItems = items || defaultItems;

  return (
    <div className="px-2">
      <div className="max-w-6xl mx-auto py-4">
        <div className="text-[#041e50]">
          <MakoBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNav;