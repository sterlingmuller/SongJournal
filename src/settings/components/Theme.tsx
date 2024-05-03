import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import { COLOR_THEME_NAMES } from '@src/common/constants';
import { colorThemeName } from '@src/common/types';
import ColorThemeOption from '@src/settings/subcomponents/ColorThemeOption';
import useSettingsStyle from '@styles/settings';

const Theme = () => {
  const styles = useSettingsStyle();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Theme</StyledText>
      {COLOR_THEME_NAMES.map((theme: colorThemeName) => (
        <ColorThemeOption key={theme} label={theme} />
      ))}
    </View>
  );
};

export default Theme;
