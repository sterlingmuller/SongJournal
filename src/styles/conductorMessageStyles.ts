import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  eggContainer: ViewStyle;
  tipText: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
  italicText: TextStyle;
}

const useConductorMessageStyles = () => {
  const { theme } = useColorTheme();

  const conductorMessageStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: SCREEN_HEIGHT * 0.1,
      backgroundColor: theme.primaryBackground,
    },
    textbox: {
      width: '80%',
      padding: 18,
      backgroundColor: theme.secondary,
      borderRadius: 10,
      marginBottom: 20,
      marginTop: 10,
      zIndex: 2,
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
      color: theme.secondaryText,
    },
    eggContainer: {
      width: 170,
      height: 170,
      borderRadius: 85,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 5,
      marginBottom: 30,
    },
    boldText: {
      fontWeight: '700',
      color: theme.secondaryText,
    },
    italicText: {
      fontStyle: 'italic',
      color: theme.secondaryText,
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

  return conductorMessageStyles;
};

export default useConductorMessageStyles;
