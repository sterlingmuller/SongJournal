import React from 'react';
import { View, Text } from 'react-native';

import BackupAndSync from '@src/settings/components/BackupAndSync';
import Theme from '@src/settings/components/Theme';
import About from '@src/settings/components/About';
import useSettingsStyle from '@styles/settings';

const SettingsScreen = () => {
  const styles = useSettingsStyle();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BackupAndSync />
        <Theme />
        <About />
      </View>
      <Text style={styles.version}>Version 0.0.0</Text>
    </View>
  );
};

export default SettingsScreen;
