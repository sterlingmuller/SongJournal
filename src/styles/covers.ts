import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  artistFlashContainer: ViewStyle;
  songFlashContainer: ViewStyle;
  artistSection: ViewStyle;
  separator: ViewStyle;
  cardContainer: ViewStyle;
  cardContent: ViewStyle;
  titleSection: ViewStyle;
  artistName: TextStyle;
  coverCount: TextStyle;
}

const useCoversStyle = () => {
  const { theme } = useColorTheme();

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    artistFlashContainer: {
      paddingVertical: 10,
      paddingBottom: 150,
    },
    songFlashContainer: {
      paddingVertical: 0,
      paddingBottom: 0,
    },
    artistSection: {
      marginBottom: 5,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryText,
    },

    cardContainer: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      marginHorizontal: 15,
      marginTop: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleSection: {
      flex: 1,
    },
    artistName: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    coverCount: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.tipText,
    },
  });
};

export default useCoversStyle;
