import React from 'react';
import { View } from 'react-native';

import BackupAndSync from '@src/settings/components/BackupAndSync';
import Theme from '@src/settings/components/Theme';
import About from '@src/settings/components/About';
import useSettingsStyle from '@styles/settings';
import useGlobalStyles from '@styles/global';
import StyledText from '@src/common/components/StyledText';

const SettingsScreen = () => {
  const styles = useSettingsStyle();
  const globalStyles = useGlobalStyles();

  return (
    <View style={globalStyles.container}>
      <View style={styles.content}>
        <BackupAndSync />
        <Theme />
        <About />
      </View>
      <StyledText style={styles.version}>Version 0.0.0</StyledText>
    </View>
  );
};

export default SettingsScreen;
