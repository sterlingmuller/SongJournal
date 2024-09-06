import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  clearButton: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  clearText: TextStyle;
  tipText: TextStyle;
}

const useCommonModalStyle = () => {
  const commonModalStyle: Styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '80%',
      height: 280,
      borderRadius: 15,
      gap: 30,
      paddingTop: 25,
    },

    title: {
      paddingLeft: 40,
      fontSize: 24,
    },

    textbox: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 6,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 35,
      marginBottom: 10,
    },

    input: {
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
    },

    clearButton: {
      paddingRight: 10,
      alignSelf: 'center',
    },

    clearText: { fontWeight: 'bold' },

    tipText: {
      fontStyle: 'italic',
      fontSize: 12,
      textAlign: 'center',
      marginHorizontal: 20,
      paddingBottom: 10,
    },
  });

  return commonModalStyle;
};

export default useCommonModalStyle;
