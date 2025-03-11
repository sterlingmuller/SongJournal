import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
}

const useHomeFooterStyles = () => {
  const { theme } = useColorTheme();

  const homeFooterStyles: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: '9%',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.primary,
      alignSelf: 'center',
    },
  });

  return homeFooterStyles;
};

export default useHomeFooterStyles;
