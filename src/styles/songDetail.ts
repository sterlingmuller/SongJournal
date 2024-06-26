import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { PickerStyle } from 'react-native-picker-select';

interface Styles {
  container: ViewStyle;
  pageContainer: ViewStyle;
  textbox: ViewStyle;
  pageTextbox: ViewStyle;
  completedContainer: ViewStyle;
  checkbox: ViewStyle;
  text: TextStyle;
  selectStyles: PickerStyle;
}

const useSongDetailStyles = () => {
  const songDetailStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
    },

    pageContainer: {
      alignItems: 'center',
      gap: 4,
    },

    textbox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      width: 45,
      height: 30,
      borderWidth: 1,
      borderColor: '#ccc',
    },

    pageTextbox: {
      backgroundColor: '#D9D9D9',
      width: 40,
      height: 25,
      borderWidth: 1,
      borderColor: '#ccc',
    },

    completedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingBottom: 10,
    },

    checkbox: {
      borderWidth: 1,
      borderColor: 'ccc',
      borderRadius: 5,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 6,
      paddingBottom: 6,
    },

    text: { fontSize: 16 },

    selectStyles: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });

  return songDetailStyles;
};

export default useSongDetailStyles;
