import { StyleSheet, ViewStyle } from 'react-native';

import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  separator: ViewStyle;
}

const useCommonStyle = () => {
  const { theme } = useColorTheme();

  const commonStyle: Styles = StyleSheet.create({
    separator: {
      height: 2,
      backgroundColor: theme.primaryBackground,
      marginVertical: 8,
      borderRadius: 10,
    },
  });

  return commonStyle;
};

export default useCommonStyle;
