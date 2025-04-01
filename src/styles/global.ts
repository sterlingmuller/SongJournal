import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface GlobalStyles {
  container: ViewStyle;
  content: ViewStyle;
  text: TextStyle;
}

const useGlobalStyles = () => {
  const { theme } = useColorTheme();

  const globalStyles: GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
      // height: '100%',
    },
    content: {
      flex: 1,
    },
    text: {
      color: theme.primaryText,
    },
  });

  return globalStyles;
};

export default useGlobalStyles;
