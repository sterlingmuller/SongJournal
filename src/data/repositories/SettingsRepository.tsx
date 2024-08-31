import {
  UpdateUserSettingsPayload,
  UserSettings,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchUserSettings = (db: SQLiteDatabase): UserSettings => {
  try {
    return db.getFirstSync(
      'SELECT defaultSortType, defaultArtist, isNumbered, hideTips FROM Settings',
    );
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
