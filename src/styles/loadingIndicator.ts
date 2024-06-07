import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const useLoadingIndicatorStyles = () => {
  const loadingIndicatorStyles: Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return loadingIndicatorStyles;
};

export default useLoadingIndicatorStyles;
