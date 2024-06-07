import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  text: TextStyle;
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
      fontWeight: '500',
    },

    text: {
      fontSize: 16,
      textAlign: 'center',
      paddingBottom: 25,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },

    button: {
      width: 100,
      borderRadius: 10,
    },
  });

  return deleteModalStyle;
};

export default useDeleteModalStyles;
