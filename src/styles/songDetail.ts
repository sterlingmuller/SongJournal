import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  completedContainer: ViewStyle;
  checkbox: ViewStyle;
  labelText: TextStyle;
  inputText: TextStyle;
  select: ViewStyle;
  pickerContainer: ViewStyle;
}

const useSongDetailStyles = () => {
  const { theme } = useColorTheme();

  const songDetailStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
    },

    textbox: {
      backgroundColor: theme.inputBackground,
      borderRadius: 5,
      width: 65,
      height: 30,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },

    completedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },

    checkbox: {
      borderWidth: 2,
      borderColor: theme.primaryText,
      borderRadius: 5,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 6,
      paddingBottom: 6,
    },

    labelText: { fontSize: 14, color: theme.primaryText, fontWeight: 600 },
    inputText: { fontSize: 14, color: theme.secondaryText, fontWeight: 700 },

    select: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },

    pickerContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      marginBottom: 5,
    },
  });

  return songDetailStyles;
};

export default useSongDetailStyles;
