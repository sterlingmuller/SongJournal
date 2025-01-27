import {
  UpdateSettingsDbPayload,
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
      displayTips: Boolean(settings.displayTips),
      conductor: settings.conductor,
      cloudConnection: settings.cloudConnection,
      isAutoSyncEnabled: Boolean(settings.isAutoSyncEnabled),
      isUnstarredTakeConditionEnabled: Boolean(
        settings.isUnstarredTakeConditionEnabled,
      ),
      isCompletedSongConditionEnabled: Boolean(
        settings.isCompletedSongConditionEnabled,
      ),
    };
  } catch (err) {
    console.error('Error fetching user settings', err);
  }
};

export const updateUserSettings = async (payload: UpdateSettingsDbPayload) => {
  const { updatedSettings, db } = payload;

  try {
    if (updatedSettings && Object.keys(updatedSettings).length > 0) {
      const clauses = Object.keys(updatedSettings)
        .map((key: keyof UserSettings) => `${key} = ?`)
        .join(', ');
      const params = Object.values(updatedSettings);

      await db.runAsync(`UPDATE Settings SET ${clauses}`, ...params);
    }
  } catch (err) {
    console.error('Error updating user settings,', err);
  }
};
