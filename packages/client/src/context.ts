import { createContext } from 'react';

export const Context = createContext<{
  unit: 'metric' | 'imperial';
  changeUnitType: (unit: 'imperial' | 'metric') => void;
}>({
  unit: 'metric',
  changeUnitType: (unit: 'imperial' | 'metric'): void => {
    unit; // stop eslint from screaming at me
  },
});
