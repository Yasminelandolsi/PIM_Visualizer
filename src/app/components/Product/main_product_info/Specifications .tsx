import React, { ReactNode } from 'react';

interface Specification {
  label: string;
  value: string;
}

interface SpecificationsProps {
  specifications: Specification[];
  title?: string;
}

// Helper function to detect if a string contains numerical values
const containsNumber = (str: string): boolean => {
  return /\d/.test(str);
};

// Changed return type from JSX.Element to ReactNode
const formatValue = (value: string): ReactNode => {
  if (containsNumber(value)) {
    // For values with numbers, make them bold
    return <span className="font-bold">{value}</span>;
  }
  // For non-numerical values, return as is
  return <span>{value}</span>;
};

const Specifications: React.FC<SpecificationsProps> = ({
  specifications,
  title = "Technical Specifications"
}) => {
  if (!specifications || specifications.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 mb-8">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#041e50' }}>{title}</h2>
      
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
              {specifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {spec.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatValue(spec.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile-friendly card style for small screens */}
      <div className="md:hidden space-y-4">
        {specifications.map((spec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 font-medium text-gray-900">
              {spec.label}
            </div>
            <div className="px-4 py-3 text-gray-700">
              {formatValue(spec.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;