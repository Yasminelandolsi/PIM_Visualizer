'use client';
import React, { useMemo, memo } from 'react';

type AttributeValue = string | number | boolean | string[] | null | undefined;

interface Specification {
  label: string;
  value: AttributeValue;
}

interface SpecificationsProps {
  specifications?: Specification[];
  attributes?: Record<string, AttributeValue>;
  title?: string;
}

// Extracted into a separate component for better re-rendering optimization
const SpecificationValue = memo(({ value }: { value: AttributeValue }) => {
  if (value === null || value === undefined) {
    return <span className="text-gray-400">Not specified</span>;
  }
  

  if (typeof value === 'number' || (typeof value === 'string' && /\d/.test(value))) {
    return <span className="font-bold">{value.toString()}</span>;
  }
  
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5">
        {value.map((item, idx) => (
          <li key={idx}>{String(item)}</li>
        ))}
      </ul>
    );
  }
  
  return <span>{String(value)}</span>;
});
SpecificationValue.displayName = 'SpecificationValue';

// Table row component to optimize re-renders
const TableRow = memo(({ spec, index }: { spec: Specification; index: number }) => (
  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
    <td className="px-6 py-4 text-sm font-medium text-gray-900">
      {spec.label}
    </td>
    <td className="px-6 py-4 text-sm text-gray-700">
      <SpecificationValue value={spec.value} />
    </td>
  </tr>
));
TableRow.displayName = 'TableRow';

// Card component for mobile view
const SpecCard = memo(({ spec }: { spec: Specification }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-900">
      {spec.label}
    </div>
    <div className="px-4 py-3 text-gray-700">
      <SpecificationValue value={spec.value} />
    </div>
  </div>
));
SpecCard.displayName = 'SpecCard';

// Helper function to convert attributes object to specifications array
const convertAttributesToSpecifications = (attributes: Record<string, AttributeValue>): Specification[] => {
  return Object.entries(attributes).map(([key, value]) => ({
    label: key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase()), 
    value: value
  }));
};

const Specifications: React.FC<SpecificationsProps> = memo(({
  specifications,
  attributes,
  title = "Technical Specifications"
}) => {
  // Memoize the specs conversion to prevent unnecessary calculations
  const specs = useMemo(() => {
    if (specifications?.length) {
      return specifications;
    }
    if (attributes && Object.keys(attributes).length > 0) {
      return convertAttributesToSpecifications(attributes);
    }
    return [];
  }, [specifications, attributes]);
  
  // Don't render if no specifications are available
  if (specs.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#041e50]">{title}</h2>
      
      {/* Table for medium screens and larger */}
      <div className="hidden md:block">
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Characteristic
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {specs.map((spec, index) => (
                <TableRow key={`${spec.label}-${index}`} spec={spec} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile-friendly card style for small screens */}
      <div className="md:hidden space-y-4">
        {specs.map((spec, index) => (
          <SpecCard key={`${spec.label}-${index}`} spec={spec} />
        ))}
      </div>
    </div>
  );
});

Specifications.displayName = 'Specifications';

export default Specifications;