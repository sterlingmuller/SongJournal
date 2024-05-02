import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { colorThemeName } from '@src/common/types';
import { useColorTheme } from '@src/theme/ThemeContext';
import useSettingsStyle from '@styles/settings';

interface Props {
  label: colorThemeName;
}

const ColorThemeOption = ({ label }: Props) => {
  const styles = useSettingsStyle();

  const { switchTheme, themeName } = useColorTheme();
  const isSelected: boolean = themeName === label;

  const onPress = () => {
    switchTheme(label);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isSelected && styles.selectedTheme}
    >
      <Text style={styles.themeLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ColorThemeOption;
