import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { COLOR_THEME_OPTIONS } from '@src/components/common/constants';
import ColorThemeOption from '@src/components/settings/subcomponents/ColorThemeOption';
import useSettingsStyle from '@src/styles/settings';
import { ColorTheme } from '@src/components/common/enums';

const Theme = () => {
  const styles = useSettingsStyle();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Theme</StyledText>
      {COLOR_THEME_OPTIONS.map((theme: ColorTheme) => (
        <ColorThemeOption key={theme} label={theme} />
      ))}
    </View>
  );
};

export default Theme;
