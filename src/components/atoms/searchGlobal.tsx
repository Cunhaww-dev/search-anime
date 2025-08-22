import { Search, X } from "lucide-react";
import { useSearch } from "@/contexts/searchContext";
import { ChangeEvent } from "react";

export function SearchGlobal() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="text-gray-500" size={20} />
      </div>

      <input
        type="text"
        placeholder="Buscar animes..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full bg-gray-800 border border-transparent rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all duration-200"
      />

      {searchTerm && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={clearInput}
            aria-label="Limpar busca"
            className="p-2 mr-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
