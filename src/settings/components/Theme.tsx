import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';
import ColorThemeOption from '../subcomponents/ColorThemeOption';

const Theme = ({}) => {
  const [colorTheme, setColorTheme] = useState('light');
  const themes = ['Light', 'Dark', 'Metal', 'Psych', 'Twee', 'Pop'];

   return (
    <View>
      <Text style={settingsStyle.sectionTitle}>Theme</Text>
      {themes.map(theme => <ColorThemeOption label={theme} colorTheme={colorTheme} setColorTheme={setColorTheme}/>)}
    </View>
   );
};

export default Theme;