import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/context/ThemeContext';

interface Styles {
  rowContainer: ViewStyle;
  contents: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  deleteRow: ViewStyle;
  playbackBar: ViewStyle;
  deleteButton: ViewStyle;
  rowPressed: ViewStyle;
  title: TextStyle;
  editTitleText: TextStyle;
  warningText: TextStyle;
}

const useSongFolderStyles = () => {
  const { theme } = useColorTheme();

  const songFolderStyles: Styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      backgroundColor: theme.primaryBackground,
      paddingVertical: 12,
      paddingLeft: 25,
      paddingRight: 30,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      justifyContent: 'space-between',
      alignContent: 'center',
    },

    rowPressed: { backgroundColor: '#DDD' },

    contents: {
      flexDirection: 'column',
      gap: 10,
    },

    title: {
      fontSize: 24,
      color: theme.primaryText,
    },

    iconRow: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },

    playIcon: {
      position: 'absolute',
      alignSelf: 'center',
      paddingBottom: 40,
      right: 40,
    },

    playbackBar: {
      height: 15,
      width: '66%',
      backgroundColor: theme.primary,
      alignSelf: 'center',
    },

    deleteRow: {
      alignItems: 'center',
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingLeft: 15,
    },

    deleteButton: {
      right: 30,
    },

    editTitleText: {
      borderBottomColor: theme.highlight,
      backgroundColor: theme.secondaryBackground,
      borderBottomWidth: 1,
      margin: -1,
      width: '50%',
      fontSize: 24,
      color: theme.primaryText,
    },

    warningText: {
      fontStyle: 'italic',
    },
  });

  return songFolderStyles;
};

export default useSongFolderStyles;
