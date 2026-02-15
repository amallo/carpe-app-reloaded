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

interface LocalIdContextValue {
  localId: string;
  setLocalId: (id: string) => void;
  pseudo: string;
  setPseudo: (value: string) => void;
}

const LocalIdContext = createContext<LocalIdContextValue | null>(null);

export function LocalIdProvider({ children }: { children: React.ReactNode }) {
  const [localId, setLocalIdState] = useState(defaultId);
  const [pseudo, setPseudoState] = useState('');
  const setLocalId = useCallback((id: string) => setLocalIdState(id), []);
  const setPseudo = useCallback((value: string) => setPseudoState(value), []);
  const value = useMemo(
    () => ({ localId, setLocalId, pseudo, setPseudo }),
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
