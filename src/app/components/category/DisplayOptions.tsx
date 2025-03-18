import { Grid, List } from "lucide-react";

const DisplayOptions = () => {
  return (
    <div className="border-b pb-2 mb-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-gray-600">374 078 résultat(s)</span>
        <div className="flex gap-2">
          <button className="p-2 border rounded focus:ring-2 focus:ring-blue-500">
            <Grid size={20} />
          </button>
          <button className="p-2 border rounded focus:ring-2 focus:ring-blue-500">
            <List size={20} />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-600">Trier par :</span>
          <select className="p-2 border rounded focus:ring-2 focus:ring-blue-500">
            <option>Pertinence</option>
            <option>Nom Ascendant</option>
            <option>Nom Descendant</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DisplayOptions;