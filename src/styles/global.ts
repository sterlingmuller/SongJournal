import { StyleSheet, ViewStyle } from 'react-native';

interface GlobalStyles {
  container: ViewStyle;
}

const globalStyles: GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333333',
    height: '100%',
    width: '100%',
  },
});

export default globalStyles;
