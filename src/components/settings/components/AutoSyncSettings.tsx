import React, { useCallback } from 'react';
import { Button, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectUserSettings } from '@src/state/selectors/settingsSelector';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import SettingsToggle from '../subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';
import { useToggleSetting } from '@src/hooks/useToggleSettings';
import { ToggleableSettings } from '@src/components/common/enums';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useOneTimeSync from '@src/services/cloudStorage/dropbox/hooks/useOneTimeSync';

const AutoSyncSettings = () => {
  const { theme } = useColorTheme();
  const styles = useCloudStorageStyle();
  const {
    isUnstarredTakeConditionEnabled,
    isCompletedSongConditionEnabled,
    isAutoSyncEnabled,
    displayTips,
  } = useAppSelector(selectUserSettings);
  const toggleSetting = useToggleSetting();
  const performBackup = useOneTimeSync();

  const handleBackup = useCallback(async () => {
    performBackup();
  }, [performBackup]);

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Auto Sync Settings</StyledText>
      <View style={styles.togglesContainer}>
        <SettingsToggle
          label="Sync Unstarred Takes"
          isActive={isUnstarredTakeConditionEnabled}
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
          Tip: Enabling auto sync will upload the lyrics and Starred Take for
          each song, upon creation. You can customize sync filters above.
        </StyledText>
      )}
    </View>
  );
};

export default AutoSyncSettings;
