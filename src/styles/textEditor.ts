import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  editor: TextStyle;
  toolbarContainer: ViewStyle;
  buttonGroup: ViewStyle;
  textButtons: ViewStyle;
  shortcutButtons: ViewStyle;
  button: ViewStyle;
  fixedWidthButton: ViewStyle;
  smallFixedWidthButton: ViewStyle;
  separatorBar: ViewStyle;
  sectionPicker: ViewStyle;
  sectionButton: ViewStyle;
  sectionText: TextStyle;
  shortcutText: TextStyle;
}

const useTextEditorStyles = () => {
  const textEditorStyles: Styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      flexDirection: 'column',
    },
    inputContainer: {
      height: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      paddingVertical: 10,
    },
    editor: {
      flex: 1,
      textAlignVertical: 'top',
      paddingTop: 15,
      paddingBottom: 10,
      paddingHorizontal: 20,
      fontFamily: 'monospace',
      color: 'black'
    },
    toolbarContainer: {
      backgroundColor: '#f5f5f5',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      paddingVertical: 6,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      position: 'relative',
    },
    buttonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textButtons: {
      flexDirection: 'row',
      paddingRight: 5,
      paddingLeft: 8,
    },
    shortcutButtons: {
      flexDirection: 'row',
      flex: 1,
      paddingLeft: 5,
      paddingRight: 8,
    },
    button: {
      padding: 8,
    },
    fixedWidthButton: {
      padding: 2,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallFixedWidthButton: {
      flex: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    separatorBar: {
      width: 2,
      backgroundColor: '#cccccc',
      height: '100%',
    },
    sectionPicker: {
      position: 'absolute',
      bottom: 60,
      right: 5,
      maxWidth: '40%',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    sectionButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      width: '100%',
    },
    sectionText: {
      fontSize: 16,
      textAlign: 'center',
    },
    shortcutText: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return textEditorStyles;
};

export default useTextEditorStyles;
