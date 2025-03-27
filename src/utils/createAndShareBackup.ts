import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { Alert } from 'react-native';

import {
  AUDIO_DIR,
  BACKUP_DIR,
  DB_NAME,
  DB_PATH,
} from '@src/components/common/constants';

export const createBackup = async () => {
  try {
    await FileSystem.makeDirectoryAsync(BACKUP_DIR, { intermediates: true });

    await FileSystem.copyAsync({
      from: DB_PATH,
      to: `${BACKUP_DIR}${DB_NAME}`,
    });

    const audioDirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);

    if (audioDirInfo.exists && audioDirInfo.isDirectory) {
      const audioFiles = await FileSystem.readDirectoryAsync(AUDIO_DIR);
      if (audioFiles.length > 0) {
        await FileSystem.makeDirectoryAsync(`${BACKUP_DIR}Audio`, {
          intermediates: true,
        });
        for (const file of audioFiles) {
          await FileSystem.copyAsync({
            from: `${AUDIO_DIR}${file}`,
            to: `${BACKUP_DIR}Audio/${file}`,
          });
        }
      }
    }

    const zipPath = `${FileSystem.cacheDirectory}songjournal_backup.zip`;
    await zip(BACKUP_DIR, zipPath);

    await FileSystem.deleteAsync(BACKUP_DIR, { idempotent: true });

    return zipPath;
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw new Error('Backup creation failed');
  }
};

export const createAndShareBackup = async () => {
  try {
    const zipPath = await createBackup();

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(zipPath);
    } else {
      throw new Error('Sharing is not available on this device');
    }

    await FileSystem.deleteAsync(zipPath, { idempotent: true });

    Alert.alert(
      'Backup Successful',
      'Your backup has been created and shared.',
    );
  } catch (error) {
    console.error('Backup failed:', error);
    Alert.alert(
      'Backup Failed',
      'An error occurred while creating the backup.',
    );
  }
};
