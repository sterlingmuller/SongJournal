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
  tipText: TextStyle;
}

const useSortByModalStyles = () => {
  const { theme } = useColorTheme();

  const sortByModalStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.secondary,
      width: '100%',
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
      color: theme.primaryText,
    },

    line: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: theme.primaryText,
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
      color: theme.primaryText,
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

    tipText: {
      width: '100%',
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 30,
      paddingTop: 10,
      paddingBottom: 5,
      fontStyle: 'italic',
      color: theme.secondaryTipText,
      fontWeight: '600',
    },

    bold: {
      fontWeight: 800,
    },
  });

  return sortByModalStyles;
};

export default useSortByModalStyles;
