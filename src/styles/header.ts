import { useColorTheme } from '@src/theme/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  headerStyle: ViewStyle;
  headerTitleStyle: TextStyle;
  rightIcon: ViewStyle;
}

const useHeaderStyles = () => {
  const { theme } = useColorTheme();

  const headerStyles: Styles = StyleSheet.create({
    headerStyle: { backgroundColor: theme.header },
    headerTitleStyle: { fontSize: 28 },
    rightIcon: { padding: 8 },
  });

  return headerStyles;
};

export default useHeaderStyles;
