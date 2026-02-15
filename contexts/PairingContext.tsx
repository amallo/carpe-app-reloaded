'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PairingContextValue {
  isPaired: boolean;
  pairedDeviceName: string | null;
  setPaired: (paired: boolean, deviceName?: string | null) => void;
}

const PairingContext = createContext<PairingContextValue | null>(null);

export function PairingProvider({ children }: { children: React.ReactNode }) {
  const [isPaired, setIsPaired] = useState(false);
  const [pairedDeviceName, setPairedDeviceName] = useState<string | null>(null);

  const setPaired = useCallback((paired: boolean, deviceName?: string | null) => {
    setIsPaired(paired);
    setPairedDeviceName(paired ? deviceName ?? null : null);
  }, []);

  const value = useMemo<PairingContextValue>(
    () => ({ isPaired, pairedDeviceName, setPaired }),
    [isPaired, pairedDeviceName, setPaired]
  );

  return (
    <PairingContext.Provider value={value}>{children}</PairingContext.Provider>
  );
}

export function usePairing() {
  const ctx = useContext(PairingContext);
  if (!ctx) throw new Error('usePairing must be used within PairingProvider');
  return ctx;
}
