import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  eggContainer: ViewStyle;
  arrow: ViewStyle;
  tipText: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
  italicText: TextStyle;
}

const useGetStartedHomeStyles = () => {
  const { theme } = useColorTheme();

  const createNewSongButtonStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 520,
      gap: 20,
      backgroundColor: theme.primaryBackground,
    },
    textbox: {
      width: '80%',
      padding: 18,
      backgroundColor: theme.secondary,
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
    },
    arrow: {
      position: 'absolute',
      top: 0,
      right: '20%',
      width: 60,
      height: 50,
      backgroundColor: theme.secondary,
      transform: [{ rotate: '45deg' }],
      zIndex: -1,
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
      fontWeight: 'bold',
    },
    italicText: {
      fontStyle: 'italic',
    },
    tipText: {
      position: 'absolute',
      bottom: 20,
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 30,
      fontStyle: 'italic',
      color: theme.primary,
      fontWeight: '600',
    },
  });

  return createNewSongButtonStyles;
};

export default useGetStartedHomeStyles;
