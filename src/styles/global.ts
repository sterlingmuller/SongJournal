import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface GlobalStyles {
  container: ViewStyle;
  text: TextStyle;
}

const useGlobalStyles = () => {
  const { theme } = useColorTheme();

  const globalStyles: GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },

    text: {
      color: theme.primaryText,
    },
  });

  return globalStyles;
};

export default useGlobalStyles;
