import { StyleSheet, ViewStyle } from 'react-native';

import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  placeholderContainer: ViewStyle;
  backgroundContainer: ViewStyle;
  underlayContainer: ViewStyle;
  underlayContent: ViewStyle;
}

const useHomeSwipeListStyles = () => {
  const homeSwipeListStyles: Styles = StyleSheet.create({
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
