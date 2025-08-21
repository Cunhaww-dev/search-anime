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
    // 1. CONTAINER PRINCIPAL:
    //    - 'w-full': Ocupa toda a largura do seu contêiner pai.
    //    - 'max-w-xs' ou 'max-w-sm': Define uma largura MÁXIMA para telas grandes,
    //      evitando que o input fique excessivamente largo. 'max-w-xs' (20rem/320px)
    //      ou 'max-w-sm' (24rem/384px) são boas opções.
    //    - 'relative': Necessário para posicionar o ícone de busca de forma absoluta.
    <div className="relative w-full max-w-sm">
      {/* 2. ÍCONE DE BUSCA (POSICIONAMENTO ABSOLUTO):
          - Posicionado à esquerda, dentro do input, para um visual mais limpo.
          - 'pointer-events-none': Garante que o ícone não intercepte cliques,
            permitindo que o usuário clique "através" dele para focar no input. */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="text-gray-500" size={20} />
      </div>

      {/* 3. INPUT FIELD:
          - 'w-full': Garante que o input preencha todo o container.
          - 'pl-10': Adiciona um padding à esquerda para dar espaço ao ícone de busca.
          - 'pr-10': Adiciona um padding à direita para dar espaço ao botão de limpar.
          - As outras classes mantêm o estilo visual que você já tinha. */}
      <input
        type="text"
        placeholder="Buscar animes..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full bg-gray-800 border border-transparent rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all duration-200"
      />

      {/* 4. BOTÃO DE LIMPAR (POSICIONAMENTO ABSOLUTO):
          - Posicionado à direita, dentro do input.
          - A renderização condicional 'searchTerm && (...)' é mantida, o que é ótimo. */}
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={clearInput}
            aria-label="Limpar busca" // Melhora a acessibilidade
            className="p-2 mr-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
