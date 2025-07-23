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

const BATCH_SIZE = 10;

const copyAudioFilesBatch = async (audioFiles: string[], startIdx: number) => {
  const batch = audioFiles.slice(startIdx, startIdx + BATCH_SIZE);
  await Promise.all(
    batch.map(file =>
      FileSystem.copyAsync({
        from: `${EXTRACT_DIR}Audio/${file}`,
        to: `${AUDIO_DIR}${file}`,
      })
    )
  );
};

const validateBackup = async (extractPath: string): Promise<boolean> => {
  try {
    const dbInfo = await FileSystem.getInfoAsync(`${extractPath}${DB_NAME}`);
    if (!dbInfo.exists) {
      throw new Error('Invalid backup: Database file not found');
    }

    const audioInfo = await FileSystem.getInfoAsync(`${extractPath}Audio`);
    if (audioInfo.exists && !audioInfo.isDirectory) {
      throw new Error('Invalid backup: Audio is not a directory');
    }

    return true;
  } catch (error) {
    console.error('Backup validation failed:', error);
    return false;
  }
};

export const importBackup = async () => {
  try {
    const result: DocumentPickerResult = await getDocumentAsync({
      type: 'application/zip',
    });

    if (result.canceled) return false;

    const userConfirmed = await new Promise(
      (resolve: (value: boolean) => void) => {
        Alert.alert(
          'Overwrite All Data?',
          'This will replace ALL your current songs and recordings with the backup contents.',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
            {
              text: 'Continue',
              style: 'destructive',
              onPress: () => resolve(true),
            },
          ]
        );
      }
    );

    if (!userConfirmed) return false;

    const backupUri = result.assets[0].uri;

    await FileSystem.deleteAsync(EXTRACT_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(EXTRACT_DIR, { intermediates: true });

    await unzip(backupUri, EXTRACT_DIR);
    const isValid = await validateBackup(EXTRACT_DIR);

    if (!isValid) {
      throw new Error('Invalid backup file');
    }

    const db = SQLite.openDatabaseSync(DB_NAME);
    await db.closeAsync();

    await FileSystem.deleteAsync(DB_PATH, { idempotent: true });
    await FileSystem.copyAsync({
      from: EXTRACT_DIR + DB_NAME,
      to: DB_PATH,
    });

    await FileSystem.deleteAsync(AUDIO_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });

    try {
      const restoredAudioFiles = await FileSystem.readDirectoryAsync(
        `${EXTRACT_DIR}Audio/`
      );

      for (let i = 0; i < restoredAudioFiles.length; i += BATCH_SIZE) {
        await copyAudioFilesBatch(restoredAudioFiles, i);
      }
    } catch (error) {
      console.warn('No audio files to restore:', error);
    }

    await FileSystem.deleteAsync(EXTRACT_DIR, { idempotent: true });
    SQLite.openDatabaseSync(DB_NAME);

    Alert.alert(
      'Restore Successful',
      'Your data has been successfully restored.'
    );

    return true;
  } catch (error) {
    console.error('Import failed:', error);
    Alert.alert(
      'Import Failed',
      'The backup file appears to be invalid or corrupted. Please try again with a different backup.'
    );
    return false;
  } finally {
    await FileSystem.deleteAsync(EXTRACT_DIR, { idempotent: true });
  }
};
