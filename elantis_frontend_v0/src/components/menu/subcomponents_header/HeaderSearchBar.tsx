import React from "react";
import { FiSearch } from "react-icons/fi";
import { SearchBarProps } from "./types";

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={onSearchChange}
        className="border border-gray-300 rounded-md px-3 py-1.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;