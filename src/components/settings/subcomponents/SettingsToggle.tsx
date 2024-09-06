import { Switch, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';
import usePreferencesStyle from '@src/styles/preferences';

interface Props {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const SettingsToggle = ({ label, isActive, onToggle }: Props) => {
  const styles = usePreferencesStyle();
  const { theme } = useColorTheme();

  return (
    <View style={styles.toggleContainer}>
      <StyledText style={styles.toggleLabel}>{label}</StyledText>
      <Switch
        value={isActive}
        onValueChange={onToggle}
        trackColor={{ false: theme.highlight, true: theme.mutedPrimary }}
        thumbColor={isActive ? theme.primary : '#f4f3f4'}
      />
    </View>
  );
};

export default SettingsToggle;
