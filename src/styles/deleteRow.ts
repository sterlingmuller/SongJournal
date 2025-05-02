import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  contents: ViewStyle;
}

const useDeleteRowStyle = () => {
  const deleteRowStyle: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'red',
      paddingVertical: 12,
      paddingLeft: 25,
      paddingRight: 30,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      justifyContent: 'space-between',
      alignContent: 'center',
    },

    contents: {
      flexDirection: 'column',
      gap: 10,
    },
  });

  return deleteRowStyle;
};

export default useDeleteRowStyle;
