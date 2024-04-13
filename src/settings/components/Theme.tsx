import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';

const Theme = ({}) => {
  const themes = ['light', 'dark', 'metal', 'psych', 'twee', 'pop'];

   return (
    <View style={settingsStyle.sectionTitle}>
      <Text>Theme</Text>
      <Text>{themes}</Text>
    </View>
   );
};

export default Theme;