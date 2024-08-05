import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  completedContainer: ViewStyle;
  checkbox: ViewStyle;
  text: TextStyle;
  select: ViewStyle;
  pickerContainer: ViewStyle;
}

const useSongDetailStyles = () => {
  const songDetailStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
    },

    textbox: {
      backgroundColor: '#f0f0f0',
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
