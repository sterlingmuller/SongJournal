import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  modalContainer: ViewStyle;
  artistRow: ViewStyle;
  artistNameContainer: ViewStyle;
  textbox: ViewStyle;
  editTextbox: ViewStyle;
  input: ViewStyle;
  deleteButton: ViewStyle;
  editButton: ViewStyle;
  newArtistInput: ViewStyle;
  infoContainer: ViewStyle;
  iconsContainer: ViewStyle;
  buttons: ViewStyle;
  separator: ViewStyle;
  infoText: TextStyle;
  title: TextStyle;
  tipText: TextStyle;
}

const useEditOrAddArtistStyles = () => {
  const { theme } = useColorTheme();

  const editOrAddArtistStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      maxHeight: SCREEN_HEIGHT * 0.2,
    },
    modalContainer: {
      alignSelf: 'center',
      width: '80%',
      maxHeight: SCREEN_HEIGHT * 0.6,
      borderRadius: 15,
      gap: 30,
      paddingTop: 25,
      backgroundColor: theme.secondary,
      paddingHorizontal: 10,
    },
    separator: {
      height: 1,
      backgroundColor: theme.secondary,
      marginVertical: 2,
      borderRadius: 10,
    },
    artistRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    artistNameContainer: { width: '50%' },
    textbox: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      padding: 6,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginBottom: 5,
    },
    editTextbox: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      padding: 2,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
    },
    input: {
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
    },
    deleteButton: {
      marginLeft: 10,
      padding: 5,
      borderRadius: 5,
    },
    editButton: {
      marginLeft: 10,
      padding: 5,
      borderRadius: 5,
    },
    newArtistInput: {
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
    },
    infoContainer: {
      width: '75%',
      alignSelf: 'center',
      paddingBottom: 10,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    buttons: { paddingBottom: '10%' },

    infoText: {
      textAlign: 'right',
      fontSize: 14,
      color: 'gray',
    },
    title: {
      paddingLeft: 30,
      fontSize: 24,
      fontWeight: '500',
    },
    tipText: {
      fontStyle: 'italic',
      fontSize: 12,
      textAlign: 'center',
      marginHorizontal: 10,
      color: theme.primary,
      fontWeight: '500',
    },
  });

  return editOrAddArtistStyles;
};

export default useEditOrAddArtistStyles;
