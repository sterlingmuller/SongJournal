import React, {
  Context,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import * as NavigationBar from 'expo-navigation-bar';

import themes, { Theme } from '@src/theme/themes';
import { ColorTheme } from '@src/components/common/enums';

interface ColorThemeContextType {
  theme: Theme;
  switchTheme: (newTheme: ColorTheme) => void;
  isThemeLoading: boolean;
  themeName: ColorTheme;
}

interface SettingsResult {
  theme: ColorTheme;
}

const ColorThemeContext: Context<ColorThemeContextType> = createContext(null);

type Props = {
  children?: ReactNode;
};

export const ColorThemeProvider = ({ children }: Props) => {
  const db = useSQLiteContext();
  const [themeName, setThemeName] = useState<ColorTheme>(ColorTheme.DARK);
  const [isThemeLoading, setIsThemeLoading] = useState<boolean>(true);
  const theme: Theme = themes[themeName];

  useEffect(() => {
    const loadThemePreference = () => {
      try {
        const result: SettingsResult = db.getFirstSync(
          `SELECT theme FROM Settings WHERE id = 1`,
        );

        if (result) {
          setThemeName(result.theme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsThemeLoading(false);
      }
    };

    loadThemePreference();
  }, [db]);

  const switchTheme = async (newTheme: ColorTheme) => {
    setThemeName(newTheme);
    try {
      await db.runAsync(`UPDATE Settings SET theme = ? WHERE id = 1`, [
        newTheme,
      ]);
      NavigationBar.setBackgroundColorAsync(themes[newTheme].primary);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  if (isThemeLoading) {
    return null;
  }
  return (
    <ColorThemeContext.Provider
      value={{ theme, switchTheme, isThemeLoading, themeName }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme: () => ColorThemeContextType = () =>
  useContext(ColorThemeContext);
