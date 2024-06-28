import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  input: TextStyle;
}

const useSearchBarStyle = () => {
  const searchBarStyle: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 6,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 35,
    },

    input: {
      flex: 1,
      fontSize: 16,
      marginLeft: 8,
    },
  });

  return searchBarStyle;
};

export default useSearchBarStyle;
