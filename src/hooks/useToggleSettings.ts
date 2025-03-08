import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { UserSettings } from '@src/components/common/types';
import { selectUserSettings } from '@src/state/selectors/settingsSelector';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import { ToggleableSettings } from '@src/components/common/enums';

export const useToggleSetting = () => {
  const dispatch = useAppDispatch();
  const userSettings = useAppSelector(selectUserSettings);
  const db = useSQLiteContext();

  const toggleSetting = (setting: ToggleableSettings) => {
    const updatedSettings: Partial<UserSettings> = {
      [setting]: !userSettings[setting],
    };
    dispatch(updateSettingsRequest({ db, updatedSettings }));
  };

  return toggleSetting;
};
