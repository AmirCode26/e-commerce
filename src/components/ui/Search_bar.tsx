// components/catalog/Search_bar.tsx
"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function Search_bar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <search className="w-full md:max-w-xl h-1/2 md:h-full relative">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full h-full border bg-stone-200 rounded-none px-4 py-2 pr-10 text-sm tracking-wide outline-none focus:border-gray-900 transition-colors"
      />
      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900"
      />
    </search>
  );
}

export default Search_bar;
