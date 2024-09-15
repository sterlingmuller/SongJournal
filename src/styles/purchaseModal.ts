import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  conductorContainer: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  price: TextStyle;
}

const usePurchaseModalStyle = () => {
  const { theme } = useColorTheme();

  const purchaseModalStyle: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.primaryBackground,
      width: '80%',
      borderRadius: 15,
      gap: 20,
      paddingVertical: 20,
    },

    title: {
      paddingHorizontal: 40,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    conductorContainer: {},
    button: {
      backgroundColor: theme.secondary,
      width: '60%',
      alignItems: 'center',
      paddingVertical: 5,
      borderRadius: 10,
    },
    price: { fontWeight: 'bold', fontSize: 16 },
  });

  return purchaseModalStyle;
};

export default usePurchaseModalStyle;
