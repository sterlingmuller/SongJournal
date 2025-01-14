import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  content: ViewStyle;
  togglesContainer: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  sectionTitle: TextStyle;
  title: TextStyle;
  syncSettingsText: TextStyle;
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
      backgroundColor: theme.clearBackground,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'column',
      marginVertical: 15,
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
    },

    button: {
      width: 140,
      borderRadius: 10,
    },
  });

  return cloudStorageStyle;
};

export default useCloudStorageStyle;
