import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  content: ViewStyle;
  version: ViewStyle;
  selectedTheme: ViewStyle;
  themeLabel: ViewStyle;
  button: ViewStyle;
  sectionTitle: TextStyle;
  title: TextStyle;
  about: TextStyle;
  aboutSignature: TextStyle;
}

const useSettingsStyle = () => {
  const { theme } = useColorTheme();

  const settingsStyle: Styles = StyleSheet.create({
    content: {
      gap: 20,
      paddingTop: 15,
      paddingHorizontal: 25,
      flex: 1,
    },

    sectionTitle: {
      fontSize: 16,
      paddingBottom: 5,
      fontWeight: 'bold',
    },

    title: {
      fontSize: 30,
      paddingLeft: 40,
    },

    version: {
      paddingTop: 30,
      paddingBottom: 20,
      alignSelf: 'center',
      color: theme.headerText,
    },

    about: {
      textAlign: 'center',
    },

    aboutSignature: {
      textAlign: 'center',
      paddingTop: 10,
    },

    selectedTheme: {
      backgroundColor: theme.highlight,
      borderRadius: 20,
      marginRight: 40,
    },

    themeLabel: {
      paddingVertical: 4,
      marginLeft: 55,
    },

    button: {
      width: 100,
      borderRadius: 10,
    },
  });

  return settingsStyle;
};

export default useSettingsStyle;
