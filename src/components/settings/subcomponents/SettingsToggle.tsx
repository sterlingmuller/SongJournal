import { Switch, View } from 'react-native';
import { useState, useEffect } from 'react';

import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';
import usePreferencesStyle from '@src/styles/preferences';

interface Props {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  isAscendingToggle?: boolean;
}

const SettingsToggle = ({
  label,
  isActive,
  onToggle,
  isAscendingToggle = false,
}: Props) => {
  const styles = usePreferencesStyle();
  const { theme } = useColorTheme();
  const [localActive, setLocalActive] = useState(isActive);

  useEffect(() => {
    setLocalActive(isActive);
  }, [isActive]);

  const handleToggle = () => {
    setLocalActive(!localActive);
    onToggle();
  };

  return (
    <View style={styles.toggleContainer}>
      <StyledText
        style={[styles.labelText, isAscendingToggle && { marginRight: 6 }]}
      >
        {label}
      </StyledText>
      <Switch
        value={localActive}
        onValueChange={handleToggle}
        trackColor={{ false: theme.highlight, true: theme.toggleShadow }}
        thumbColor={localActive ? theme.toggleOn : '#f4f3f4'}
      />
    </View>
  );
};

export default SettingsToggle;
