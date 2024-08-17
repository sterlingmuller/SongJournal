import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  headerStyle: { backgroundColor: string };
  headerTitleStyle: { fontSize: number; color: string };
  rightIcon: { padding: number };
  headerTintColor: string;
}

const useHeaderStyles = () => {
  const { theme } = useColorTheme();

  const headerStyles: Styles = {
    headerStyle: { backgroundColor: theme.primary },
    headerTitleStyle: { fontSize: 28, color: theme.headerText },
    rightIcon: { padding: 8 },
    headerTintColor: theme.headerText,
  };

  return headerStyles;
};

export default useHeaderStyles;
