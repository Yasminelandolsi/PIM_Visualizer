import { memo } from 'react';

interface RadioFilterProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const RadioFilter = ({ id, name, checked, onChange, label }: RadioFilterProps) => (
  <div className="flex items-center">
    <input 
      type="radio" 
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
);

export default memo(RadioFilter);