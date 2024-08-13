import React, {
  Context,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

import themes, { Theme } from '@src/theme/themes';
import { ColorTheme } from '@src/common/enums';

interface ColorThemeContextType {
  theme: Theme;
  switchTheme: (newTheme: ColorTheme) => void;
  themeName: ColorTheme;
}

const ColorThemeContext: Context<ColorThemeContextType> = createContext(null);

type Props = {
  children?: ReactNode;
};

export const ColorThemeProvider = ({ children }: Props) => {
  const [themeName, setThemeName] = useState<ColorTheme>(ColorTheme.LIGHT);
  const theme: Theme = themes[themeName];

  const switchTheme = (newTheme: ColorTheme) => {
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
