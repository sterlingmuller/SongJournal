import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface GlobalStyles {
  container: ViewStyle;
  content: ViewStyle;
  text: TextStyle;
  tipText: TextStyle;
}

const useGlobalStyles = () => {
  const { theme } = useColorTheme();

  const globalStyles: GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },
    content: {
      flex: 1,
    },
    text: {
      color: theme.primaryText,
    },

    tipText: {
      width: '100%',
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 30,
      paddingBottom: 20,
      fontStyle: 'italic',
      color: theme.tipText,
      fontWeight: '600',
      marginTop: 'auto',
    },
  });

  return globalStyles;
};

export default useGlobalStyles;
