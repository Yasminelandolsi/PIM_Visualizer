import React, { ReactNode } from 'react';

// Define a union type for all possible attribute values
type AttributeValue = string | number | boolean | string[] | null | undefined;

// Update the Specification interface to use the new type
interface Specification {
  label: string;
  value: AttributeValue;
}

interface SpecificationsProps {
  specifications?: Specification[];
  // Use Record with specific value types instead of any
  attributes?: Record<string, AttributeValue>;
  title?: string;
}

// Enhanced value formatting to handle multiple data types
const formatValue = (value: AttributeValue): ReactNode => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return <span className="text-gray-400">Not specified</span>;
  }
  

  
  // Handle numeric values
  if (typeof value === 'number' || (typeof value === 'string' && /\d/.test(value))) {
    return <span className="font-bold">{value.toString()}</span>;
  }
  
  // Handle arrays (like lists of features)
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5">
        {value.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  }
  
  // Default: return as string
  return <span>{String(value)}</span>;
};

// Helper function to convert attributes object to specifications array
const convertAttributesToSpecifications = (attributes: Record<string, AttributeValue>): Specification[] => {
  return Object.entries(attributes).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), // Format camelCase to Title Case
    value: value
  }));
};
const Specifications: React.FC<SpecificationsProps> = ({
  specifications,
  attributes,
  title = "Technical Specifications"
}) => {
  // Convert attributes object to specifications array if provided
  const specs = specifications || (attributes ? convertAttributesToSpecifications(attributes) : []);
  
  // Don't render if no specifications are available
  if (!specs || specs.length === 0) {
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
              {specs.map((spec, index) => (
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
        {specs.map((spec, index) => (
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