import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const recordButtonStyles: Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 5,
    alignSelf: 'center',
    bottom: 50,
  },
});

export default recordButtonStyles;
