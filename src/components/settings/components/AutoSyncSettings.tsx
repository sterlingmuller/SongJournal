import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectCloudConnection,
  selectDisplayTips,
  selectSyncSettings,
} from '@src/state/selectors/settingsSelector';
import useDropboxSongFolderGenerator from '@src/data/utils/useDropboxFileGenerator';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import SettingsToggle from '../subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';
import { useToggleSetting } from '@src/utils/hooks/useToggleSettings';
import { ToggleableSettings } from '@src/components/common/enums';

const AutoSyncSettings = () => {
  const styles = useCloudStorageStyle();
  const displayTips = useAppSelector(selectDisplayTips);
  const cloudConnection = useAppSelector(selectCloudConnection);
  const {
    isStarredTakeConditionEnabled,
    isCompletedSongConditionEnabled,
    isAutoSyncEnabled,
  } = useAppSelector(selectSyncSettings);
  const toggleSetting = useToggleSetting();
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
          isActive={isStarredTakeConditionEnabled}
          onToggle={() =>
            toggleSetting(ToggleableSettings.IS_STARRED_TAKE_CONDITION_ENABLED)
          }
        />
        <Separator />
        <SettingsToggle
          label="Sync only Completed Songs"
          isActive={isCompletedSongConditionEnabled}
          onToggle={() =>
            toggleSetting(
              ToggleableSettings.IS_COMPLETED_SONG_CONDITION_ENABLED,
            )
          }
        />
        <Separator />
        <SettingsToggle
          label="Auto Sync"
          isActive={isAutoSyncEnabled}
          onToggle={() =>
            toggleSetting(ToggleableSettings.IS_AUTO_SYNC_ENABLED)
          }
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
