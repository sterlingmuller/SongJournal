import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  rowContainer: ViewStyle;
  rowPressed: ViewStyle;
  contents: ViewStyle;
  coverTitle: TextStyle;
  title: TextStyle;
  titleContainer: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  deleteRow: ViewStyle;
  deleteButton: ViewStyle;
  separator: ViewStyle;
  staticPlaybackBar: ViewStyle;
  subtextContainer: ViewStyle;
  editTitleText: TextStyle;
  warningText: TextStyle;
  trackSubtext: TextStyle;
  tipText: TextStyle;
  coverStaticPlaybackBar: ViewStyle;
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
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    rowPressed: { backgroundColor: theme.mutedPrimary },
    contents: {
      flexDirection: 'column',
    },
    coverTitle: {
      fontSize: 20,
      color: theme.primaryText,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 24,
      color: theme.primaryText,
      fontWeight: 'bold',
    },
    titleContainer: {
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    iconRow: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
      paddingTop: 5,
    },
    playIcon: {
      position: 'absolute',
      alignSelf: 'center',
      paddingBottom: 40,
      right: 40,
    },
    deleteRow: {
      alignItems: 'center',
      backgroundColor: theme.error,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingLeft: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryText,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryText,
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
      fontWeight: 'bold',
    },
    staticPlaybackBar: {
      height: 15,
      width: SCREEN_WIDTH * 0.5,
      backgroundColor: theme.primary,
      marginLeft: 14,
      borderRadius: 8,
    },
    coverStaticPlaybackBar: {
      height: 15,
      width: SCREEN_WIDTH * 0.45,
      backgroundColor: theme.primary,
      marginLeft: 14,
      borderRadius: 8,
    },
    warningText: {
      fontStyle: 'italic',
      alignSelf: 'center',
    },
    trackSubtext: {
      fontStyle: 'italic',
    },
    subtextContainer: { height: 40, flexDirection: 'column' },
    tipText: {
      paddingTop: 24,
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 30,
      fontStyle: 'italic',
      color: theme.tipText,
      fontWeight: '600',
    },
  });

  return songFolderStyles;
};

export default useSongFolderStyles;
