import { useState } from "react";

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  const [view, setView] = useState("grid");

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">{categoryName}</h1>
      <div className="flex gap-4">
        <button
          className={`${view === "grid" ? "font-bold" : ""}`}
          onClick={() => setView("grid")}
        >
          Grid
        </button>
        <button
          className={`${view === "list" ? "font-bold" : ""}`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <select className="border p-2 rounded">
          <option value="asc">Name Ascending</option>
          <option value="desc">Name Descending</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryHeader;
