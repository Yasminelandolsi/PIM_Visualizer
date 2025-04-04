"use client";
import { SearchField } from "@mako/core";
import React, { useState, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";

// Debounce function to limit search calls
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = memo(() => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300); // 300ms debounce
  
  // Memoize event handlers to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSearch = useCallback((term: string) => {
    if (term.trim()) {
      // Navigate to search results page or dispatch search action
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  }, [router]);

  const handleClear = useCallback(() => {
    setValue("");
  }, []);

  // Trigger search on debounced value change (if implementing auto-search)
  useEffect(() => {
    if (debouncedValue) {
      // Only uncomment if you want auto-search as user types
      // handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <section 
      className="w-full h-[80vh] min-h-[350px] bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_20%,transparent_40%,transparent_60%,rgba(0,0,0,0.7)_80%),url('/background_rubix.jpg')] bg-cover bg-left-center flex items-center justify-center relative z-[1]"
      aria-label="Product search"
    >
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
            aria-label="Search products"
          />
        </div>
      </div>
    </section>
  );
});

// Add display name for better debugging
SearchBar.displayName = "SearchBar";

export default SearchBar;