import React from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';
import headerStyles from '@src/styles/header';

const Header = () => (
    <View style={headerStyles.container}>
      <Text style={settingsStyle.title}>Settings</Text>
    </View>
);

export default Header;
