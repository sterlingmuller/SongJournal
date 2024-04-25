import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';
import { COLOR_THEME_NAMES } from '@src/common/constants';
import ColorThemeOption from '@src/settings/subcomponents/ColorThemeOption';
import { colorThemeName } from '@src/common/types';

const Theme = () => {
  const [colorTheme, setColorTheme] = useState<colorThemeName>('Light');

  return (
    <View>
      <Text style={settingsStyle.sectionTitle}>Theme</Text>
      {COLOR_THEME_NAMES.map((theme: colorThemeName) => (
        <ColorThemeOption
          key={theme}
          label={theme}
          colorTheme={colorTheme}
          setColorTheme={setColorTheme}
        />
      ))}
    </View>
  );
};

export default Theme;
