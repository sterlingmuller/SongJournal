import {
  AUDIO_DIR,
  DB_NAME,
  DB_PATH,
  EXTRACT_DIR,
} from '@src/components/common/constants';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import { getDocumentAsync, DocumentPickerResult } from 'expo-document-picker';
import { unzip } from 'react-native-zip-archive';

export const importBackup = async () => {
  try {
    const result: DocumentPickerResult = await getDocumentAsync({
      type: 'application/zip',
    });

    if (result.canceled === false) {
      const backupUri = result.assets[0].uri;

      await FileSystem.makeDirectoryAsync(EXTRACT_DIR, { intermediates: true });
      await unzip(backupUri, EXTRACT_DIR);

      const db = SQLite.openDatabaseSync(DB_NAME);
      await db.closeAsync();

      await FileSystem.deleteAsync(DB_PATH, { idempotent: true });
      await FileSystem.copyAsync({
        from: EXTRACT_DIR + DB_NAME,
        to: DB_PATH,
      });

      await FileSystem.deleteAsync(AUDIO_DIR, { idempotent: true });
      await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
      const restoredAudioFiles = await FileSystem.readDirectoryAsync(
        `${EXTRACT_DIR}Audio/`,
      );
      for (const file of restoredAudioFiles) {
        await FileSystem.copyAsync({
          from: `${EXTRACT_DIR}Audio/${file}`,
          to: `${AUDIO_DIR}${file}`,
        });
      }

      await FileSystem.deleteAsync(EXTRACT_DIR, { idempotent: true });
      SQLite.openDatabaseSync(DB_NAME);

      Alert.alert(
        'Restore Successful',
        'Your data has been successfully restored.',
      );
    }
  } catch (error) {
    console.error('Import failed:', error);
    Alert.alert(
      'Import Failed',
      'An error occurred while importing the backup.',
    );
  }
};
