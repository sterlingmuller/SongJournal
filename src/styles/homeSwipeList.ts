import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  separator: ViewStyle;
  container: ViewStyle;
  placeholderContainer: ViewStyle;
  separatorContainer: ViewStyle;
  defaultSeparator: ViewStyle;
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
      backgroundColor: '#000',
    },
    container: {
      flex: 1,
      width: '100%',
    },
    placeholderContainer: {
      flex: 1,
    },
    separatorContainer: {
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    defaultSeparator: {
      height: 2,
      width: '100%',
      backgroundColor: 'black',
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
