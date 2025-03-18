import { StyleSheet, ViewStyle } from 'react-native';

import { SCREEN_WIDTH } from '@src/components/common/constants';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  separator: ViewStyle;
  container: ViewStyle;
  placeholderContainer: ViewStyle;
  backgroundContainer: ViewStyle;
  underlayContainer: ViewStyle;
  underlayContent: ViewStyle;
}

const useHomeSwipeListStyles = () => {
  const { theme } = useColorTheme();

  const homeSwipeListStyles: Styles = StyleSheet.create({
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: theme.primaryText,
    },
    container: {
      flex: 1,
      width: '100%',
    },
    placeholderContainer: {
      flex: 1,
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
    },
    underlayContainer: {
      height: '100%',
      overflow: 'hidden',
    },
    underlayContent: {
      width: SCREEN_WIDTH,
      height: '100%',
      position: 'absolute',
      right: 0,
    },
  });

  return homeSwipeListStyles;
};

export default useHomeSwipeListStyles;
