import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';
import { colorThemeNames } from '@src/common/constants';
import ColorThemeOption from '@src/settings/subcomponents/ColorThemeOption';
import { colorThemeName } from '@src/common/types';

const Theme = () => {
  const [colorTheme, setColorTheme] = useState<colorThemeName>('Light');

  return (
    <View>
      <Text style={settingsStyle.sectionTitle}>Theme</Text>
      {colorThemeNames.map((theme) => (
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
