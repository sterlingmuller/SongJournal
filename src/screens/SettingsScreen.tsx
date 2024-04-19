import React from 'react';
import { View, Text } from 'react-native';

import settingsStyle from '@styles/settings';
import BackupAndSync from '@src/settings/components/BackupAndSync';
import Theme from '@src/settings/components/Theme';
import About from '@src/settings/components/About';

const SettingsScreen = () => (
  <View style={settingsStyle.container}>
    <View style={settingsStyle.content}>
      <BackupAndSync />
      <Theme />
      <About />
    </View>
    <Text style={settingsStyle.version}>Version 0.0.0</Text>
  </View>
);

export default SettingsScreen;
