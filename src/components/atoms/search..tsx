import { Search } from "lucide-react";

export function SearchGlobal() {
  return (
    <div className="relative w-64">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Buscar animes..."
        className="bg-gray-800 border border-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-purple-600 transition-colors duration-200"
      />
    </div>
  );
}
