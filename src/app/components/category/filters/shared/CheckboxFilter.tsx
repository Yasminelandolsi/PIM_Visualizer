import { memo } from 'react';

interface CheckboxFilterProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const CheckboxFilter = ({ id, checked, onChange, label }: CheckboxFilterProps) => (
  <div className="flex items-center">
    <input 
      type="checkbox" 
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
);

export default memo(CheckboxFilter);