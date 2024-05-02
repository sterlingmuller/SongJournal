import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface GlobalStyles {
  container: ViewStyle;
}

const useGlobalStyles = () => {
  const { theme } = useColorTheme();

  const globalStyles: GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      fontSize: 16,
      fontFamily: 'Roboto',
      color: '#333333',
      height: '100%',
      width: '100%',
    },
  });

  return globalStyles;
};

export default useGlobalStyles;
