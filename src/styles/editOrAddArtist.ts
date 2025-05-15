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
  deleteButton: ViewStyle;
  editButton: ViewStyle;
  newArtistInput: TextStyle;
  editArtistInput: TextStyle;
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
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 6,
      width: '90%',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginBottom: 5,
    },
    editTextbox: {
      flexDirection: 'row',
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      marginVertical: 2,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
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
      fontWeight: 500,
      color: theme.secondaryText,
    },
    editArtistInput: {
      fontSize: 14,
      marginLeft: 6,
      fontWeight: 600,
      color: theme.secondaryText,
    },
    infoContainer: {
      width: '80%',
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
      color: theme.secondaryText,
    },
    title: {
      paddingLeft: 20,
      fontSize: 24,
      fontWeight: '600',
      color: theme.secondaryText,
    },
    tipText: {
      fontStyle: 'italic',
      fontSize: 12,
      textAlign: 'center',
      marginHorizontal: 10,
      color: theme.secondaryTipText,
      fontWeight: '600',
    },
  });

  return editOrAddArtistStyles;
};

export default useEditOrAddArtistStyles;
