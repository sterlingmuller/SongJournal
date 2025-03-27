import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useColorTheme } from '@src/state/context/ThemeContext';
import { colors as c } from '@src/theme/colors';

interface Styles {
  container: ViewStyle;
  section: ViewStyle;
  timeSection: ViewStyle;
  seperator: ViewStyle;
  rightSection: ViewStyle;
  wheelText: TextStyle;
  line: ViewStyle;
  categories: ViewStyle;
  selectedCategory: ViewStyle;
  sectionLabel: TextStyle;
  title: TextStyle;
}

const useWheelPickerModalStyles = () => {
  const { theme } = useColorTheme();

  const sortByModalStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.secondary,
      width: '100%',
      height: '35%',
      bottom: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    section: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingRight: 10,
    },

    timeSection: {
      backgroundColor: theme.secondary,
    },

    rightSection: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingRight: 10,
    },

    wheelText: {
      fontSize: 24,
      fontWeight: 700,
    },

    title: {
      paddingVertical: 15,
      paddingLeft: 30,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.secondaryText,
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

    sectionLabel: {
      fontSize: 20,
      fontWeight: '700',
    },

    seperator: {
      height: 50,
    },
  });

  return sortByModalStyles;
};

export default useWheelPickerModalStyles;
