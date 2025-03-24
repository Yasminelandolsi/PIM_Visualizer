import React from 'react';

interface Specification {
  label: string;
  value: string;
}

interface SpecificationsProps {
  specifications: Specification[];
  title?: string;
}

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specifications.map((spec, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
            <div className="text-lg font-medium">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;