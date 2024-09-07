import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useColorTheme } from '@src/state/context/ThemeContext';
import { colors as c } from '@src/theme/colors';

interface Styles {
  container: ViewStyle;
  line: ViewStyle;
  categories: ViewStyle;
  selectedCategory: ViewStyle;
  label: ViewStyle;
  arrow: ViewStyle;
  title: TextStyle;
  filterContainer: ViewStyle;
  filterRow: ViewStyle;
  filterToggle: ViewStyle;
  toggleLabel: TextStyle;
}

const useSortByModalStyles = () => {
  const { theme } = useColorTheme();

  const sortByModalStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.secondary,
      width: '100%',
      height: '45%',
      borderBottomWidth: 1,
      borderBottomColor: c.black,
      bottom: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    title: {
      paddingVertical: 15,
      paddingLeft: 30,
      fontSize: 16,
      fontWeight: 'bold',
    },

    line: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: c.black,
    },

    categories: {
      paddingTop: 4,
      paddingLeft: 10,
    },

    selectedCategory: {
      backgroundColor: theme.highlight,
      borderRadius: 20,
      marginRight: 40,
      justifyContent: 'center',
    },

    label: {
      paddingVertical: 4,
      marginLeft: 55,
    },

    arrow: {
      paddingLeft: 15,
      position: 'absolute',
    },

    filterContainer: {
      flexDirection: 'column',
    },

    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
    },

    filterToggle: { flexDirection: 'row', alignItems: 'center', width: '42%' },

    toggleLabel: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  });

  return sortByModalStyles;
};

export default useSortByModalStyles;
