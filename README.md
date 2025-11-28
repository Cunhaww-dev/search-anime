# Search Anime

Busca simples de animes construída com Next.js + React + TypeScript. Interface leve com pesquisa, paginação e filtros por gênero/temporada.

## Sobre

Projeto que consome uma API para buscar e exibir animes, com componentes reutilizáveis (cards, carrossel, listas) e estado de busca centralizado.

## Estrutura principal

- Páginas e layout:
  - [src/app/page.tsx](src/app/page.tsx)
  - [src/app/layout.tsx](src/app/layout.tsx)
  - [src/app/globals.css](src/app/globals.css)
- Hooks:
  - [`useAnimes`](src/hooks/useAnimes.ts)
  - [`useApi`](src/hooks/useApi.ts)
  - [`useDebounce`](src/hooks/useDebounce.ts)
  - [`usePagination`](src/hooks/usePagination.ts)
  - [`useMobile`](src/hooks/use-mobile.ts)
- Contextos:
  - [`SearchContext`](src/contexts/searchContext.tsx)
- Comunicação HTTP / API:
  - [src/http/api.ts](src/http/api.ts)
- Componentes (exemplos):
  - Átomos: [src/components/atoms/searchGlobal.tsx](src/components/atoms/searchGlobal.tsx), [src/components/atoms/logo.tsx](src/components/atoms/logo.tsx)
  - Moléculas: [src/components/molecules/animeCard.tsx](src/components/molecules/animeCard.tsx)
  - Organismos: [src/components/organisms/animeList.tsx](src/components/organisms/animeList.tsx), [src/components/organisms/animeCarousel.tsx](src/components/organisms/animeCarousel.tsx), [src/components/organisms/navbar.tsx](src/components/organisms/navbar.tsx)
  - Template: [src/components/templates/pageLayout.tsx](src/components/templates/pageLayout.tsx)
- Utilitários e tipos:
  - [src/lib/utils.ts](src/lib/utils.ts)
  - [src/types/index.ts](src/types/index.ts)

## Principais fluxos

- Busca e debounce: [`useDebounce`](src/hooks/useDebounce.ts) + [`useAnimes`](src/hooks/useAnimes.ts)
- Paginação: [`usePagination`](src/hooks/usePagination.ts)
- Estado global da busca: [`SearchContext`](src/contexts/searchContext.tsx)
- Requisições: [src/http/api.ts](src/http/api.ts) (usa Axios)

## Tecnologias

- Next.js (app router) — [next](package.json)
- React 19 + TypeScript
- Tailwind CSS — [tailwind.config.ts](tailwind.config.ts)
- TanStack Query — [`@tanstack/react-query`](package.json)
- Axios — [package.json](package.json)
- Radix UI — [package.json](package.json)

## Como rodar

Instalar dependências e iniciar em modo dev:

```sh
# terminal
npm install
npm run dev
```
