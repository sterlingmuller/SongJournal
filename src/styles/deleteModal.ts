import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
}

const useDeleteModalStyles = () => {
  const { theme } = useColorTheme();

  const deleteModalStyle: Styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: theme.secondary,
      width: '80%',
      borderRadius: 15,
      padding: 20,
    },

    title: {
      fontSize: 20,
      textAlign: 'center',
      paddingBottom: 20,
      fontWeight: '700',
      color: theme.secondaryText,
    },

    text: {
      fontSize: 16,
      textAlign: 'center',
      paddingBottom: 25,
      color: theme.secondaryText,
    },

    boldText: {
      fontSize: 16,
      textAlign: 'center',
      paddingBottom: 25,
      color: theme.secondaryText,
      fontWeight: 700,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 5,
      gap: 20,
    },

    button: {
      width: 100,
      borderRadius: 10,
    },
  });

  return deleteModalStyle;
};

export default useDeleteModalStyles;
