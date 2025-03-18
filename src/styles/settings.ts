import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  content: ViewStyle;
  version: ViewStyle;
  selectedTheme: ViewStyle;
  themeLabel: ViewStyle;
  disabledLabel: TextStyle;
  backupButtons: ViewStyle;
  button: ViewStyle;
  conductorContainer: ViewStyle;
  conductorRow: ViewStyle;
  lockedConductorIcon: ViewStyle;
  privacyPolicyContainer: ViewStyle;
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
      fontSize: 20,
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
      color: theme.primaryText,
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

    disabledLabel: {
      paddingVertical: 4,
      marginLeft: 55,
      fontStyle: 'italic',
      color: 'gray',
    },

    backupButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingBottom: 10,
    },

    button: {
      width: '40%',
      borderRadius: 10,
    },
    conductorContainer: {
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    conductorRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    lockedConductorIcon: {
      position: 'absolute',
      right: 0,
      bottom: '35%',
    },

    privacyPolicyContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
  });

  return settingsStyle;
};

export default useSettingsStyle;
