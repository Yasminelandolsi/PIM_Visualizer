import { memo } from 'react';
import { Button } from "@mako/core";

interface ClearFiltersButtonProps {
  onClick: () => void;
}

const ClearFiltersButton = ({ onClick }: ClearFiltersButtonProps) => {
  return (
    <Button
      shape="round"
      size="small"
      variant="primary"
      onClick={onClick}
      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded text-sm transition-colors"
    >
      Clear Filters
    </Button>
  );
};

export default memo(ClearFiltersButton);