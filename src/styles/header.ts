import { ThemeProvider, useTheme } from '@src/theme/ThemeContext';
import { useContext } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  headerStyle: ViewStyle;
  headerTitleStyle: TextStyle;
  rightIcon: ViewStyle;
}

// const headerStyles: Styles = StyleSheet.create({
//   headerStyle: { backgroundColor: 'coral' },
//   headerTitleStyle: { fontSize: 28 },
//   rightIcon: { padding: 8 },
// });

const useHeaderStyles = () => {
  const { theme } = useTheme();

  const headerStyles: Styles = StyleSheet.create({
    headerStyle: { backgroundColor: theme.header },
    headerTitleStyle: { fontSize: 28 },
    rightIcon: { padding: 8 },
  });

  return headerStyles;
};

export default useHeaderStyles;
