import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectCloudConnection,
  selectDisplayTips,
} from '@src/state/selectors/settingsSelector';
import useDropboxSongFolderGenerator from '@src/data/utils/useDropboxFileGenerator';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import SettingsToggle from '../subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';

const AutoSyncSettings = () => {
  const styles = useCloudStorageStyle();
  const displayTips = useAppSelector(selectDisplayTips);
  const cloudConnection = useAppSelector(selectCloudConnection);
  const triggerBackup = useDropboxSongFolderGenerator();

  const handleBackup = () => {
    triggerBackup();
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Auto Sync Settings</StyledText>
      <View style={styles.togglesContainer}>
        <SettingsToggle
          label="Sync unstarred Takes"
          isActive={false}
          onToggle={() => {}}
        />
        <Separator />
        <SettingsToggle
          label="Sync only Completed Songs"
          isActive={false}
          onToggle={() => {}}
        />
        <Separator />
        <SettingsToggle
          label="Auto Sync"
          isActive={false}
          onToggle={() => {}}
        />
      </View>
      {displayTips && (
        <StyledText style={styles.tipText}>
          Warning: Enabling Auto Sync will immediately upload the Lyrics and
          Starred Take for each Song. New Songs will be uploaded when created.
          You can customize Sync Filters above, before enabling Auto Sync.
        </StyledText>
      )}
    </View>
  );
};

export default AutoSyncSettings;
