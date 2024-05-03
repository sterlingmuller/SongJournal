import { useColorTheme } from '@src/theme/ThemeContext';
import { TextStyle, ViewStyle } from 'react-native';

interface Styles {
  headerStyle: ViewStyle;
  headerTitleStyle: TextStyle;
  rightIcon: ViewStyle;
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
