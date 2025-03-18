import { useState } from "react";
import { Search } from "lucide-react";

const FilterDropdown = ({ title }: { title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="border rounded-lg p-2 bg-white shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="mt-2 p-2 border-t">
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Filtrer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-3 text-gray-500" size={16} />
          </div>
          <div className="mt-2 max-h-40 overflow-y-auto flex flex-col gap-2">
            <label className="flex items-center gap-2 pl-2">
              <input type="checkbox" className="accent-blue-500" /> Abrasifs (152)
            </label>
            <label className="flex items-center gap-2 pl-2">
              <input type="checkbox" className="accent-blue-500" /> Abrasifs agglomérés (36)
            </label>
            <label className="flex items-center gap-2 pl-2">
              <input type="checkbox" className="accent-blue-500" /> Accessoires (54)
            </label>
          </div>
          <div className="flex justify-between mt-3 p-2 border-t">
            <label className="flex items-center gap-2 pl-2">
              <input type="checkbox" className="accent-blue-500" /> Tout sélectionner
            </label>
            <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm">CONFIRMER</button>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterPanel = () => {
  return (
    <aside className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col gap-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Filtrer</h2>
      <FilterDropdown title="Catégorie" />
      <FilterDropdown title="Fabricant" />
      <FilterDropdown title="Langue Disponible" />
      <FilterDropdown title="ERP Référence" />
      <FilterDropdown title="Enrichissement" />
    </aside>
  );
};

export default FilterPanel;
