import React from 'react';
import { Text, View } from 'react-native';

import useSettingsStyle from '@styles/settings';

const BackupAndSync = () => {
  const styles = useSettingsStyle();

  return (
    <View>
      <Text style={styles.sectionTitle}>Back up & Sync</Text>
      <Text>
        Backing up to
        <Text> sterlingmuller93@gmail.com</Text>
      </Text>
    </View>
  );
};

export default BackupAndSync;
