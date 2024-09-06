import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  togglesContainer: ViewStyle;
  toggleContainer: ViewStyle;
  sortSettingsContainer: ViewStyle;
  selectContainer: ViewStyle;
  textbox: ViewStyle;
  toggleLabel: TextStyle;
  sectionTitle: TextStyle;
  addArtistText: TextStyle;
}

const usePreferencesStyle = () => {
  const { theme } = useColorTheme();

  const preferencesStyle: Styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 16,
      paddingBottom: 5,
      fontWeight: 'bold',
    },

    togglesContainer: {
      backgroundColor: theme.clearBackground,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'column',
    },

    toggleContainer: { flexDirection: 'row', justifyContent: 'space-between' },

    sortSettingsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    selectContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },

    toggleLabel: {},

    textbox: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 5,
      maxWidth: 100,
      minWidth: 60,
      paddingHorizontal: 5,
      minHeight: 30,
      borderWidth: 1,
      borderColor: theme.mutedPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    addArtistText: {
      color: theme.primary,
      fontStyle: 'italic',
      paddingRight: 5,
      fontWeight: '500',
    },
  });

  return preferencesStyle;
};

export default usePreferencesStyle;
