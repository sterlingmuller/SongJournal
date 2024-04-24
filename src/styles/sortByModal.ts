import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  modalContainer: ViewStyle;
  container: ViewStyle;
  line: ViewStyle;
  categories: ViewStyle;
  selectedCategory: ViewStyle;
  label: ViewStyle;
  arrow: ViewStyle;
  title: TextStyle;
}

const sortByModalStyle: Styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },

  container: {
    position: 'absolute',
    backgroundColor: '#fcd470',
    width: '100%',
    height: '22%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  title: {
    paddingVertical: 15,
    paddingLeft: 30,
  },

  line: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'black',
  },

  categories: {
    paddingTop: 4,
    paddingLeft: 10,
  },

  selectedCategory: {
    backgroundColor: '#C5C2B7',
    borderRadius: 20,
    marginRight: 40,
  },

  label: {
    paddingVertical: 4,
    marginLeft: 55,
  },

  arrow: {
    paddingLeft: 15,
    position: 'absolute',
  },
});

export default sortByModalStyle;
