import React from 'react';
import { ScrollView, View } from 'react-native';

import BackupAndSync from '@src/components/settings/components/BackupAndSync';
import Theme from '@src/components/settings/components/Theme';
import About from '@src/components/settings/components/About';
import useSettingsStyle from '@styles/settings';
import useGlobalStyles from '@styles/global';
import StyledText from '@src/components/common/components/StyledText';
import Preferences from '@src/components/settings/components/Preferences';
import BackupAndRestore from '@src/components/settings/components/BackupAndRestore';
import ChooseConductor from '@src/components/settings/components/ChooseConductor';

const SettingsScreen = () => {
  const styles = useSettingsStyle();
  const globalStyles = useGlobalStyles();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.content}>
        <BackupAndSync />
        <Preferences />
        <Theme />
        <ChooseConductor />
        <BackupAndRestore />
        <About />
      </View>
      <StyledText style={styles.version}>Version 0.0.0</StyledText>
    </ScrollView>
  );
};

export default SettingsScreen;
