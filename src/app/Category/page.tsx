'use client'

import Breadcrumb from "../components/category/Breadcrumb";
import FilterPanel from "../components/category/FilterPanel";
import ProductList from "../components/category/ProductList";
import DisplayOptions from "../components/category/DisplayOptions";



const CategoryPage = () => {
    return (
      <div className="p-4">
        <Breadcrumb />
        <div className="flex flex-col md:flex-row gap-4">
          <FilterPanel />
          <div className="w-full md:w-3/4">
            <h1 className="text-xl font-bold">Transmission</h1>
            <DisplayOptions />
            <ProductList />
          </div>
        </div>
      </div>
    );
  };
  
  export default CategoryPage;
  