import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  artistCard: ViewStyle;
}

const useCoversStyle = () => {
  const { theme } = useColorTheme();

  const coversStyle: Styles = StyleSheet.create({
    artistCard: {
       flexDirection: 'row',
      backgroundColor: theme.primaryBackground,
      paddingVertical: 12,
      paddingLeft: 25,
      paddingRight: 30,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryText,
      justifyContent: 'space-between',
      alignContent: 'center',
    },
  });

  return coversStyle;
};

export default useCoversStyle;
