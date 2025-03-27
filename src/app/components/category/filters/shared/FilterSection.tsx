import { ReactNode, memo } from 'react';
import { FILTER_SECTION_STYLE } from '../constants';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className={FILTER_SECTION_STYLE}>
    <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
    {children}
  </div>
);

export default memo(FilterSection);