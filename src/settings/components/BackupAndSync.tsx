import React from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';

const BackupAndSync = () => {
  return (
    <View>
      <Text style={settingsStyle.sectionTitle}>Back up & Sync</Text>
      <Text>
        Backing up to
        <Text>sterlingmuller93@gmail.com</Text>
      </Text>
    </View>
  );
};

export default BackupAndSync;
