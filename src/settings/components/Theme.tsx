import React from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';
import { COLOR_THEME_NAMES } from '@src/common/constants';
import ColorThemeOption from '@src/settings/subcomponents/ColorThemeOption';
import { colorThemeName } from '@src/common/types';

const Theme = () => (
  <View>
    <Text style={settingsStyle.sectionTitle}>Theme</Text>
    {COLOR_THEME_NAMES.map((theme: colorThemeName) => (
      <ColorThemeOption key={theme} label={theme} />
    ))}
  </View>
);

export default Theme;
