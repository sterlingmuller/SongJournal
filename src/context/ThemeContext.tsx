import React, {
  Context,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import themes, { Theme } from '@src/theme/themes';
import { colorThemeName } from '../common/types';

interface ColorThemeContextType {
  theme: Theme;
  switchTheme: (newTheme: colorThemeName) => void;
  themeName: colorThemeName;
}

const ColorThemeContext: Context<ColorThemeContextType> = createContext(null);

type Props = {
  children?: ReactNode;
};

export const ColorThemeProvider = ({ children }: Props) => {
  const [themeName, setThemeName] = useState<colorThemeName>('Light');
  const theme: Theme = themes[themeName];

  const switchTheme = (newTheme: colorThemeName) => {
    setThemeName(newTheme);
  };

  return (
    <ColorThemeContext.Provider value={{ theme, switchTheme, themeName }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme: () => ColorThemeContextType = () =>
  useContext(ColorThemeContext);
