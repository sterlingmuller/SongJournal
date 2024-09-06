import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import SettingsToggle from '@src/components/settings/subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';
import usePreferencesStyle from '@src/styles/preferences';
import SortSettingsOptions from '@src/components/settings/subcomponents/SortSettingsOptions';
import DefaultArtistOptions from '../subcomponents/DefaultArtistOptions';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectUserSettings } from '@src/state/selectors/settingsSelector';
import { useToggleSetting } from '@src/utils/hooks/useToggleSettings';
import { ToggleableSettings } from '@src/components/common/enums';

const Preferences = () => {
  const styles = usePreferencesStyle();
  const {
    defaultArtistId,
    defaultSortType,
    isAscending,
    isNumbered,
    displayTips,
  } = useAppSelector(selectUserSettings);
  const toggleSetting = useToggleSetting();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Preferences</StyledText>
      <View style={styles.togglesContainer}>
        <SettingsToggle
          label="Number Songs List"
          isActive={isNumbered}
          onToggle={() => toggleSetting(ToggleableSettings.IS_NUMBERED)}
        />
        <Separator />
        <SettingsToggle
          label="Display Tips"
          isActive={displayTips}
          onToggle={() => toggleSetting(ToggleableSettings.DISPLAY_TIPS)}
        />
        <Separator />
        <SortSettingsOptions
          defaultSort={defaultSortType}
          isAscending={isAscending}
        />
        <Separator />
        <DefaultArtistOptions defaultArtistId={defaultArtistId} />
      </View>
    </View>
  );
};

export default Preferences;
