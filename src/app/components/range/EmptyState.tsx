interface EmptyStateProps {
    clearAllFilters: () => void;
  }
  
  const EmptyState = ({ clearAllFilters }: EmptyStateProps) => {
    return (
      <div className="bg-white p-6 text-center rounded-lg shadow">
        <p className="text-gray-500 mb-2">No products match your filters.</p>
        <button
          onClick={clearAllFilters}
          className="text-[#041e50] hover:underline text-sm"
        >
          Clear all filters
        </button>
      </div>
    );
  };
  
  export default EmptyState;