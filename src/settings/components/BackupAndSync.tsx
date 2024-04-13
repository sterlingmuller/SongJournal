import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';

const BackupAndSync = ({}) => {

   return (
    <View>
      <Text style={settingsStyle.sectionTitle}>Backup and Sync</Text>
      <Text>Backing up to sterlingmuller93@gmail.com</Text>
    </View>
   );
};

export default BackupAndSync;