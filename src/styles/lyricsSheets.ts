import { StyleSheet } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

const useLyricSheetStyles = () => {
  const { theme } = useColorTheme();

  const lyricSheetStyles = StyleSheet.create({
    div: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: 'monospace',
    },
    span: {
      fontSize: 16,
      color: 'teal',
      fontWeight: 'bold',
      fontFamily: 'monospace',
    },
  });

  return lyricSheetStyles;
};

export default useLyricSheetStyles;
