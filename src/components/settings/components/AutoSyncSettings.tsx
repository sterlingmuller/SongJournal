import React from 'react';
import { Button, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectUserSettings } from '@src/state/selectors/settingsSelector';
import useDropboxSongFolderGenerator from '@src/data/utils/useDropboxFileGenerator';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import SettingsToggle from '../subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';
import { useToggleSetting } from '@src/utils/hooks/useToggleSettings';
import { ToggleableSettings } from '@src/components/common/enums';
import { useColorTheme } from '@src/state/context/ThemeContext';

const AutoSyncSettings = () => {
  const { theme } = useColorTheme();
  const styles = useCloudStorageStyle();
  const {
    isStarredTakeConditionEnabled,
    isCompletedSongConditionEnabled,
    isAutoSyncEnabled,
    displayTips,
  } = useAppSelector(selectUserSettings);
  const toggleSetting = useToggleSetting();
  const triggerBackup = useDropboxSongFolderGenerator();

  // useEffect(() => {
  //   if (isAutoSyncEnabled) {
  //     triggerBackup();
  //   }
  // }, [triggerBackup, isAutoSyncEnabled]);

  const handleBackup = () => {
    triggerBackup();
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Auto Sync Settings</StyledText>
      <View style={styles.togglesContainer}>
        <SettingsToggle
          label="Sync Unstarred Takes"
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
        <View style={styles.buttons}>
          <Button
            title="One-Time Sync"
            onPress={handleBackup}
            color={theme.settingsEmphasis}
          />
        </View>
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
      <Button title="test Dropbox" onPress={handleBackup} />
    </View>
  );
};

export default AutoSyncSettings;
