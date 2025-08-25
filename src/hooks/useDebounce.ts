// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

// T é um tipo genérico, tornando o hook reutilizável para qualquer tipo de valor (string, number, etc.)
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para armazenar o valor "atrasado" (debounced)
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura um temporizador para atualizar o valor debounced após o 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza: se o 'value' ou 'delay' mudar antes do tempo acabar,
    // o temporizador anterior é cancelado. Isso reinicia a contagem.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // O efeito só roda novamente se o valor ou o delay mudarem

  return debouncedValue;
}
