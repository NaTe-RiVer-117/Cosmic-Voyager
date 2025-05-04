import { createContext, useContext, useState } from 'react';
import { constellations } from '../data/constellations';

const ConstellationContext = createContext();

export function ConstellationProvider({ children }) {
  const [activeConstellation, setActiveConstellation] = useState(null);

  return (
    <ConstellationContext.Provider value={{ activeConstellation, setActiveConstellation, constellations }}>
      {children}
    </ConstellationContext.Provider>
  );
}

export function useConstellationContext() {
  return useContext(ConstellationContext);
}