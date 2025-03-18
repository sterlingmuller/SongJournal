import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  options: ViewStyle;
  iconButton: ViewStyle;
  selected: ViewStyle;
}

const useOptionBarStyles = () => {
  const { theme } = useColorTheme();

  const optionBarStyles: Styles = StyleSheet.create({
    options: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      gap: 10,
    },

    iconButton: {
      borderRadius: 30,
      padding: 8,
      backgroundColor: 'transparent',
    },

    selected: {
      backgroundColor: theme.secondary,
    },
  });

  return optionBarStyles;
};

export default useOptionBarStyles;
