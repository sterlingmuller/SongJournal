import { TouchableOpacity, View } from 'react-native';

import usePreferencesStyle from '@src/styles/preferences';
import SettingsToggle from '@src/components/settings/subcomponents/SettingsToggle';
import SettingsWheel from '@src/components/common/components/SettingsWheel';
import StyledText from '@src/components/common/components/StyledText';
import { useState } from 'react';
import { SORT_SELECT } from '@src/components/common/constants';
import { SortBy, ToggleableSettings } from '@src/components/common/enums';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import { useToggleSetting } from '@src/hooks/useToggleSettings';

interface Props {
  defaultSort: SortBy;
  isAscending: boolean;
}

const SortSettingsOptions = ({ defaultSort, isAscending }: Props) => {
  const styles = usePreferencesStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const toggleSetting = useToggleSetting();

  const [isSettingsWheelOpen, setIsSettingsWheelOpen] = useState(false);
  const [sortValue, setSortValue] = useState(defaultSort);

  const handleInputChange = (value: SortBy) => {
    setSortValue(value);
  };

  const onExitPress = () => {
    if (defaultSort !== sortValue) {
      dispatch(
        updateSettingsRequest({
          db,
          updatedSettings: { defaultSortType: sortValue },
        }),
      );
    }

    setIsSettingsWheelOpen(false);
  };

  return (
    <>
      <View style={styles.sortSettingsContainer}>
        <View style={styles.selectContainer}>
          <StyledText style={styles.labelText}>Default Sort:</StyledText>
          <TouchableOpacity
            onPress={() => setIsSettingsWheelOpen(true)}
            style={styles.textbox}
          >
            <StyledText style={styles.inputText}>{sortValue}</StyledText>
          </TouchableOpacity>
        </View>
        <SettingsToggle
          label="Ascending"
          isActive={isAscending}
          onToggle={() => toggleSetting(ToggleableSettings.IS_ASCENDING)}
        />
      </View>
      <SettingsWheel
        isWheelOpen={isSettingsWheelOpen}
        onExitPress={onExitPress}
        handleInputChange={handleInputChange}
        initialValue={defaultSort}
        label={'Default Sort'}
        items={SORT_SELECT}
      />
    </>
  );
};

export default SortSettingsOptions;
