import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const homeFooterStyles: Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'coral',
    zIndex: 5,
    bottom: 0,
  },
});

export default homeFooterStyles;
