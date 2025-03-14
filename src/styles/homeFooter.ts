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
      // height: '8%',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'center',
      backgroundColor: theme.primary,
      // backgroundColor: theme.secondaryBackground,
      // borderTopWidth: 2,
      // borderTopColor: 'black',
    },
  });

  return homeFooterStyles;
};

export default useHomeFooterStyles;
