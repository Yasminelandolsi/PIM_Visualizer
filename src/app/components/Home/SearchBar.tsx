"use client";
import { SearchField } from "@mako/core";
import React, { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (term: string) => {
    console.log("Searching for:", term);
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <div className="w-full h-[80vh] min-h-[350px] bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_20%,transparent_40%,transparent_60%,rgba(0,0,0,0.7)_80%),url('/background_rubix.jpg')] bg-cover bg-left-center flex items-center justify-center relative z-[1]">
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/30 p-5 z-[5]">
        <h1 className="text-[40px] font-normal font-['Oswald'] leading-[50px] text-[#ffd700] mb-6 text-center">
          Rubix PIM Viz
        </h1>
        <div className="flex items-center justify-center gap-2.5 w-full max-w-[80%] px-4">
          <SearchField
            className="w-full min-w-[300px] max-w-[1200px] bg-white rounded mako md:w-[90%] lg:w-[95%] xl:w-full"
            value={value}
            onChange={handleChange}
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Search by reference, by article, by brand, by keyword"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;