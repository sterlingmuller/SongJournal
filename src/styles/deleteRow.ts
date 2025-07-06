import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  deleteContainer: ViewStyle;
  deleteText: TextStyle;
}

const useDeleteRowStyles = () =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    deleteContainer: {
      width: 80,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default useDeleteRowStyles;
