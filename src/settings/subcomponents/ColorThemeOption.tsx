import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import settingsStyle from '@styles/settings';

const ColorThemeOption = ({colorTheme, setColorTheme, label}) => {
   const isSelected = colorTheme === label;

   const onPress = () =>  setColorTheme(label);

   return (
      <TouchableOpacity onPress={onPress} style={isSelected && settingsStyle.selectedTheme} >
            <Text style={settingsStyle.themeLabel}>{label}</Text>
      </TouchableOpacity>
   );
};

export default ColorThemeOption;