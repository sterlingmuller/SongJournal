import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  modalContainer: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  buttons: ViewStyle;
}

const usePermissionsNeededModalStyles = () => {
  const { theme } = useColorTheme();

  const takeNotesModalStyles: Styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      justifyContent: 'center',
    },

    container: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '80%',
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },

    title: {
      paddingTop: 10,
      fontSize: 24,
      fontWeight: '500',
    },

    text: {
      fontSize: 16,
      paddingTop: 20,
      textAlign: 'center',
    },

    buttons: {
      paddingVertical: 35,
    },
  });

  return takeNotesModalStyles;
};

export default usePermissionsNeededModalStyles;
