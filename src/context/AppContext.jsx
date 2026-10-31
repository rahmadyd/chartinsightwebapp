import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Global perspective mode: 'da' | 'ds'
  const [perspectiveMode, setPerspectiveMode] = useState(() => {
    return localStorage.getItem('cil_perspective') || 'da';
  });

  // Chart mode: 'generate' | 'input'
  const [chartMode, setChartMode] = useState(() => {
    return localStorage.getItem('cil_chartmode') || 'generate';
  });

  useEffect(() => {
    localStorage.setItem('cil_perspective', perspectiveMode);
    // Apply CSS class to root for global theming
    document.documentElement.setAttribute('data-mode', perspectiveMode);
  }, [perspectiveMode]);

  useEffect(() => {
    localStorage.setItem('cil_chartmode', chartMode);
  }, [chartMode]);

  return (
    <AppContext.Provider value={{
      perspectiveMode,
      setPerspectiveMode,
      chartMode,
      setChartMode,
      isDA: perspectiveMode === 'da',
      isDS: perspectiveMode === 'ds',
      modeColor: perspectiveMode === 'da' ? 'var(--color-da)' : 'var(--color-ds)',
      modeBtnClass: perspectiveMode === 'da' ? 'btn-da' : 'btn-ds',
      modeCardClass: perspectiveMode === 'da' ? 'card-da' : 'card-ds',
      modePillClass: perspectiveMode === 'da' ? 'pill-da' : 'pill-ds',
      modeLabel: perspectiveMode === 'da' ? 'Data Analyst' : 'Data Scientist',
      modeEmoji: perspectiveMode === 'da' ? '📊' : '🔬',
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
