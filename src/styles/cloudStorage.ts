import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  content: ViewStyle;
  togglesContainer: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  connectButton: ViewStyle;
  tipText: TextStyle;
  sectionTitle: TextStyle;
  title: TextStyle;
  syncSettingsText: TextStyle;
  boldText: TextStyle;
}

const useCloudStorageStyle = () => {
  const { theme } = useColorTheme();

  const cloudStorageStyle: Styles = StyleSheet.create({
    content: {
      gap: 20,
      paddingTop: 15,
      paddingHorizontal: 25,
      flex: 1,
    },
    togglesContainer: {
      backgroundColor: theme.secondaryBackground,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'column',
      marginVertical: 15,
    },

    tipText: {
      fontStyle: 'italic',
      fontWeight: '600',
      color: theme.tipText,
      fontSize: 12,
      textAlign: 'center',
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
    syncSettingsText: {
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 25,
      color: theme.hyperlink,
      fontWeight: 500,
      textDecorationLine: 'underline',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 20,
      paddingBottom: 10,
    },

    button: {
      width: 140,
      borderRadius: 10,
    },

    connectButton: {
      width: '60%',
      alignSelf: 'center',
      paddingVertical: 10,
    },

    boldText: {
      fontWeight: 'bold',
    },
  });

  return cloudStorageStyle;
};

export default useCloudStorageStyle;
