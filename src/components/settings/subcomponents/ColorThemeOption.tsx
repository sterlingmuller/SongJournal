import React from 'react';
import { TouchableOpacity } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useSettingsStyle from '@src/styles/settings';
import { ColorTheme } from '@src/components/common/enums';

interface Props {
  label: ColorTheme;
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
      <StyledText style={styles.themeLabel}>{label}</StyledText>
    </TouchableOpacity>
  );
};

export default ColorThemeOption;