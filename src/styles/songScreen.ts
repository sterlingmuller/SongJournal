import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
}

const useSongScreenStyles = () => {
  const songScreenStyles: Styles = StyleSheet.create({
    takes: {
      marginTop: 25,
      gap: 20,
      marginBottom: 175,
    },
  });

  return songScreenStyles;
};

export default useSongScreenStyles;
