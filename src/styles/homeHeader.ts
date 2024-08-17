import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
}

const useHomeHeaderStyles = () => {
  const { theme } = useColorTheme();

  const homeHeaderStyles: Styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: 115,
      paddingTop: 45,
      alignItems: 'center',
      backgroundColor: theme.primary,
      zIndex: 10,
      gap: 20,
    },
  });

  return homeHeaderStyles;
};

export default useHomeHeaderStyles;
