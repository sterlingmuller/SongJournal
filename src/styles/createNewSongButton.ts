import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
}

const useCreateNewSongButtonStyles = () => {
  const { theme } = useColorTheme();

  const createNewSongButtonStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      flex: 5,
      backgroundColor: theme.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 10,
      paddingVertical: 25,
      paddingHorizontal: 35,
      bottom: 60,
      right: 0,
      marginRight: 20,
      marginBottom: 20,
      elevation: 5,
    },
  });

  return createNewSongButtonStyles;
};

export default useCreateNewSongButtonStyles;
