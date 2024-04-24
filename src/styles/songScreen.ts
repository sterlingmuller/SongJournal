import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
}

const songScreenStyle: Styles = StyleSheet.create({
  takes: {
    marginTop: 25,
    gap: 20,
  },
});

export default songScreenStyle;
