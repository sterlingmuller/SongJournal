import {
  UpdateUserSettingsPayload,
  UserSettings,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchUserSettings = async (db: SQLiteDatabase) => {
  try {
    const settings: UserSettings = await db.getFirstAsync(
      'SELECT * FROM Settings WHERE id = 1',
    );
    return {
      defaultSortType: settings.defaultSortType,
      isAscending: Boolean(settings.isAscending),
      defaultArtistId: settings.defaultArtistId,
      isNumbered: Boolean(settings.isNumbered),
      hideTips: Boolean(settings.hideTips),
    };
  } catch (err) {
    console.error('Error fetching user settings', err);
  }
};

export const updateUserSettings = async (
  payload: UpdateUserSettingsPayload,
) => {
  const { userSettingUpdates, db } = payload;

  try {
    if (userSettingUpdates && Object.keys(userSettingUpdates).length > 0) {
      const clauses = Object.keys(userSettingUpdates)
        .map((key: keyof UserSettings) => `${key} = ?`)
        .join(', ');
      const params = Object.values(userSettingUpdates);

      await db.runAsync(`UPDATE Settings SET ${clauses}`, ...params);
    }
  } catch (err) {
    console.error('Error updating user settings,', err);
  }
};
