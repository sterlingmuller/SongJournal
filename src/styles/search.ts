import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  input: TextStyle;
}

const useSearchBarStyle = () => {
  const { theme } = useColorTheme();

  const searchBarStyle: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 8,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 35,
      alignItems: 'center',
    },
    close: { alignSelf: 'center' },
    input: {
      paddingVertical: 10,
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
      fontWeight: 600,
      color: theme.secondaryText,
    },
  });

  return searchBarStyle;
};

export default useSearchBarStyle;
