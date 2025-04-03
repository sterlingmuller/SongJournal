import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  sectionTitle: TextStyle;
  exampleText: TextStyle;
}

const useInfoModalStyle = () => {
  const { theme } = useColorTheme();

  const infoModalStyle: Styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.secondary,
      width: SCREEN_WIDTH * 0.8,
      maxHeight: SCREEN_HEIGHT * 0.62,
      borderRadius: 15,
      overflow: 'hidden',
      flexDirection: 'column',
      paddingLeft: 20,
      paddingRight: 20,
      paddingVertical: 15,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 5,
      color: theme.secondaryText,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
    },
    exampleText: {
      fontFamily: 'monospace',
      color: theme.secondaryTipText,
      textAlign: 'center',
      paddingBottom: 5,
      fontWeight: 'bold',
    },
  });

  return infoModalStyle;
};

export default useInfoModalStyle;
