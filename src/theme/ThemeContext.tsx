import React, { createContext, useContext, useState } from 'react';
import themes from '@src/theme/themes';
import { colorThemeName } from '../common/types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState<colorThemeName>('Light');
  const theme = themes[themeName];

  const switchTheme = (newTheme: colorThemeName) => {
    setThemeName(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
