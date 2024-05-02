import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
}

const useHomeFooterStyles = () => {
  const { theme } = useColorTheme();

  const homeFooterStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      flexDirection: 'row',
      width: '100%',
      height: 90,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.primary,
      zIndex: 5,
      bottom: 0,
    },
  });

  return homeFooterStyles;
};

export default useHomeFooterStyles;
