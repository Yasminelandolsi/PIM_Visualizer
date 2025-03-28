import { memo } from 'react';

interface SpecCardProps {
  label: string;
  value: string;
}

const SpecCard = memo(({ label, value }: SpecCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 font-medium text-gray-900 text-sm">
        {label}
      </div>
      <div className="px-3 py-2 text-gray-700 text-sm">
        {value || '—'}
      </div>
    </div>
  );
});

// Explicitly setting displayName helps with debugging
SpecCard.displayName = 'SpecCard';

export default SpecCard;