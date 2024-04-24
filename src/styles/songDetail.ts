import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  completedContainer: ViewStyle;
  checkbox: ViewStyle;
  text: TextStyle;
}

const songDetailStyle: Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },

  textbox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: 45,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  checkbox: {
    borderWidth: 1,
    borderColor: 'ccc',
    borderRadius: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
    paddingBottom: 6,
  },

  text: { fontSize: 16 },
});

export default songDetailStyle;
