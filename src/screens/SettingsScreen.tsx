import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import CloudStorage from '@src/components/settings/components/CloudStorage';
import Theme from '@src/components/settings/components/Theme';
import About from '@src/components/settings/components/About';
import useSettingsStyle from '@styles/settings';
import useGlobalStyles from '@styles/global';
import StyledText from '@src/components/common/components/StyledText';
import Preferences from '@src/components/settings/components/Preferences';
import BackupAndRestore from '@src/components/settings/components/BackupAndRestore';
import ChooseConductor from '@src/components/settings/components/ChooseConductor';
import PrivacyPolicy from '@src/components/settings/components/PrivacyPolicy';
import AutoSyncSettings from '@src/components/settings/components/AutoSyncSettings';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCloudConnection } from '@src/state/selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';
import ReportABug from '@src/components/settings/components/ReportABug';
import { APP_VERSION } from '@src/components/common/constants';

const SettingsScreen = () => {
  const styles = useSettingsStyle();
  const globalStyles = useGlobalStyles();
  const cloudConnection = useAppSelector(selectCloudConnection);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.content}>
        <CloudStorage cloudConnection={cloudConnection} />
        {cloudConnection !== CloudConnection.NONE && <AutoSyncSettings />}
        <Preferences />
        <ChooseConductor />
        <Theme />
        <BackupAndRestore />
        <ReportABug />
        <PrivacyPolicy />
        <About />
      </View>
      <StyledText style={styles.version}>{`Version ${APP_VERSION}`}</StyledText>
    </ScrollView>
  );
};

export default SettingsScreen;
