import React from 'react';
import { Breadcrumb as MakoBreadcrumb } from "@mako/core";
import { ProductDetail } from '../../types/product.type';

interface BreadcrumbNavProps {
  items?: Array<{
    href: string;
    label: string;
  }>;
  product?: ProductDetail;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, product }) => {
  const defaultItems = product ? [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: `/category/${product.category}`,
      label: product.category
    },
    {
      href: `/product/${product.reference}`,
      label: `${product.name} (${product.reference})`
    }
  ] : [
    {
      href: '/',
      label: 'Home'
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
