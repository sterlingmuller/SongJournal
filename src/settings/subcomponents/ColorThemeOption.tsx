import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import settingsStyle from '@styles/settings';
import { colorThemeName } from '@src/common/types';

interface Props {
  colorTheme: colorThemeName;
  setColorTheme: (value: colorThemeName) => void;
  label: colorThemeName;
}

const ColorThemeOption = (props: Props) => {
  const { colorTheme, setColorTheme, label } = props;
  const isSelected = colorTheme === label;

  const onPress = () => setColorTheme(label);

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
