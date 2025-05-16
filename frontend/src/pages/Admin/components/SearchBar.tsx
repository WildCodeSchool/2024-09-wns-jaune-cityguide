import React, { useState, useEffect } from "react";

type Props = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearch }: Props) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border secondary-bg flex flex-col items-center rounded-2xl w-full max-w-2xl shadow"
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Rechercher un utilisateur
      </h2>
      <div className="flex w-full gap-3 items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 pr-8 border border-gray-300 bg-white rounded w-full shadow-sm"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Effacer"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 cursor-pointer rounded hover:opacity-80"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}
