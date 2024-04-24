import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const homeHeaderStyles: Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 115,
    paddingTop: 45,
    alignItems: 'center',
    backgroundColor: 'coral',
    zIndex: 10,
    gap: 20,
  },
});

export default homeHeaderStyles;
