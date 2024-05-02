import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const useRecordButtonStyles = () => {
  const recordButtonStyles: Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      flex: 5,
      alignSelf: 'center',
      bottom: 50,
    },
  });

  return recordButtonStyles;
};

export default useRecordButtonStyles;
