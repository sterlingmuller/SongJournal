import React, { useCallback } from 'react';
import { View } from 'react-native';

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
import StyledButton from '@src/components/common/components/StyledButton';

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

  console.log('hrm');

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Sync Settings</StyledText>
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
              ToggleableSettings.IS_COMPLETED_SONG_CONDITION_ENABLED
            )
          }
        />
        <Separator />
        <SettingsToggle
          label="Enable Auto Sync"
          isActive={isAutoSyncEnabled}
          onToggle={() =>
            toggleSetting(ToggleableSettings.IS_AUTO_SYNC_ENABLED)
          }
        />
      </View>
      <StyledButton
        label="One-Time Sync"
        onPress={handleBackup}
        backgroundColor={theme.settingsEmphasis}
        textColor={'white'}
        buttonsStyle={{
          width: '50%',
          alignSelf: 'center',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          marginBottom: 10,
        }}
      />
      {displayTips && (
        <StyledText style={[styles.tipText, { marginTop: 5 }]}>
          Tip: Enabling auto sync will upload the lyrics and Starred Take for
          each song, upon creation. You can customize sync filters above.
        </StyledText>
      )}
    </View>
  );
};

export default AutoSyncSettings;
