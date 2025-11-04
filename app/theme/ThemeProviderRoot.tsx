'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ThemeRegistry, { AppMode } from './ThemeRegistry';
type Ctx = { mode: AppMode; setMode: (m: AppMode)=>void };
const ThemeModeContext = createContext<Ctx | null>(null);
export const useThemeMode = () => { const ctx = useContext(ThemeModeContext); if (!ctx) throw new Error('useThemeMode must be used within ThemeProviderRoot'); return ctx; };
export default function ThemeProviderRoot({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>(() => { if (typeof window !== 'undefined') { const saved = window.localStorage.getItem('app-mode') as AppMode | null; if (saved === 'light' || saved === 'dark' || saved === 'night') return saved; } return 'night'; });
  useEffect(()=>{ if (typeof window !== 'undefined') window.localStorage.setItem('app-mode', mode); }, [mode]);
  const value = useMemo(()=>({ mode, setMode }), [mode]);
  return (<ThemeModeContext.Provider value={value}><ThemeRegistry mode={mode}>{children}</ThemeRegistry></ThemeModeContext.Provider>);
}
