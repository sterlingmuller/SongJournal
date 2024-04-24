import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  headerStyle: ViewStyle;
  headerTitleStyle: TextStyle;
  rightIcon: ViewStyle;
}

const headerStyles: Styles = StyleSheet.create({
  headerStyle: { backgroundColor: 'coral' },
  headerTitleStyle: { fontSize: 28 },
  rightIcon: { padding: 8 },
});

export default headerStyles;
