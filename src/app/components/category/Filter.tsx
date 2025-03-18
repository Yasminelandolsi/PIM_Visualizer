import React, { useState } from "react";

// Define type for filter items
interface FilterItem {
  name: string;
  count: number;
}

const filtersData: FilterItem[] = [
  { name: "Cylindrical roller bearing", count: 23311 },
  { name: "Deep groove ball bearing", count: 33151 },
  { name: "Deep groove ball bearing - Imperial", count: 545 },
  { name: "Fixing/securing element", count: 1467 },
];

const FilterComponent: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toggle checkbox selection
  const handleCheckboxChange = (filterName: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((item) => item !== filterName)
        : [...prev, filterName]
    );
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFilters([]);
    } else {
      setSelectedFilters(filtersData.map((filter) => filter.name));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="w-full max-w-xs p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Filter</h2>

      {/* Category Section */}
      <div className="border-b py-3">
        <h3 className="text-lg font-semibold text-blue-900">Category</h3>
        <input
          type="text"
          placeholder="Filter"
          className="w-full p-2 border rounded mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <div className="mt-2 max-h-40 overflow-y-auto">
          {filtersData
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm)
            )
            .map((filter) => (
              <label
                key={filter.name}
                className="flex items-center justify-between py-1"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.name)}
                  onChange={() => handleCheckboxChange(filter.name)}
                  className="mr-2"
                />
                <span>{filter.name}</span>
                <span className="text-green-600">({filter.count})</span>
              </label>
            ))}
        </div>
      </div>

      {/* Select All and Confirm */}
      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <span>Select All</span>
      </div>
      <button
        className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded"
        disabled={selectedFilters.length === 0}
      >
        CONFIRM
      </button>

      {/* Additional Sections (Static Layout) */}
      {["Manufacturer", "Language available", "ERP reference", "Enrichment"].map(
        (section) => (
          <div key={section} className="border-t py-3">
            <h3 className="text-lg font-semibold flex justify-between">
              {section}
              <span className="text-gray-600">▼</span>
            </h3>
          </div>
        )
      )}
    </div>
  );
};

export default FilterComponent;
