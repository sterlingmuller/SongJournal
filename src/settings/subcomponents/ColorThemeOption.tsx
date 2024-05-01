import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import settingsStyle from '@styles/settings';
import { colorThemeName } from '@src/common/types';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Props {
  label: colorThemeName;
}

const ColorThemeOption = ({ label }: Props) => {
  const { switchTheme, themeName } = useColorTheme();
  const isSelected: boolean = themeName === label;

  const onPress = () => {
    switchTheme(label);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isSelected && settingsStyle.selectedTheme}
    >
      <Text style={settingsStyle.themeLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ColorThemeOption;
