import { StyleSheet } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

const useLyricSheetStyles = () => {
  const { theme } = useColorTheme();

  const lyricSheetStyles = StyleSheet.create({
    p: {
      fontSize: 16,
      color: theme.primaryText,
    },
    h1: { color: theme.primaryText, fontWeight: 'bold', fontSize: 28 },
    h2: { color: theme.primaryText, fontWeight: 'bold', fontSize: 24 },
    h3: { color: theme.primaryText, fontWeight: 'bold', fontSize: 20 },
    h4: { color: theme.primaryText, fontWeight: 'bold' },
    h5: { color: theme.primaryText },
    h6: { color: theme.primaryText },
  });

  return lyricSheetStyles;
};

export default useLyricSheetStyles;
