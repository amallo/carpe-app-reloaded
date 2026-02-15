'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

function generateLocalId(): string {
  const segment = () =>
    Math.floor(Math.random() * 0x10000)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
  return `TW-${segment()}-${segment()}`;
}

const defaultId = generateLocalId();

const PSEUDO_MAX_LENGTH = 6;

function isPseudoValid(value: string): boolean {
  return /^[A-Za-z]{6}$/.test(value);
}

interface LocalIdContextValue {
  localId: string;
  setLocalId: (id: string) => void;
  pseudo: string;
  setPseudo: (value: string) => void;
  isPseudoValid: (value: string) => boolean;
}

const LocalIdContext = createContext<LocalIdContextValue | null>(null);

export function LocalIdProvider({ children }: { children: React.ReactNode }) {
  const [localId, setLocalIdState] = useState(defaultId);
  const [pseudo, setPseudoState] = useState('');
  const setLocalId = useCallback((id: string) => setLocalIdState(id), []);
  const setPseudo = useCallback((value: string) => {
    const lettersOnly = value.replace(/[^A-Za-z]/g, '').slice(0, PSEUDO_MAX_LENGTH);
    setPseudoState(lettersOnly);
  }, []);
  const value = useMemo(
    () => ({ localId, setLocalId, pseudo, setPseudo, isPseudoValid }),
    [localId, pseudo, setPseudo]
  );
  return (
    <LocalIdContext.Provider value={value}>{children}</LocalIdContext.Provider>
  );
}

export function useLocalId() {
  const ctx = useContext(LocalIdContext);
  if (!ctx) throw new Error('useLocalId must be used within LocalIdProvider');
  return ctx;
}
