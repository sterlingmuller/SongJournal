import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { Alert } from 'react-native';

import { AUDIO_DIR, DB_NAME, DB_PATH } from '@src/components/common/constants';

export const createAndShareBackup = async () => {
  try {
    const backupDir = `${FileSystem.cacheDirectory}backup/`;
    await FileSystem.makeDirectoryAsync(backupDir, { intermediates: true });

    await FileSystem.copyAsync({
      from: DB_PATH,
      to: `${backupDir}${DB_NAME}`,
    });

    const audioFiles = await FileSystem.readDirectoryAsync(AUDIO_DIR);
    for (const file of audioFiles) {
      await FileSystem.copyAsync({
        from: `${AUDIO_DIR}${file}`,
        to: `${backupDir}audio/${file}`,
      });
    }

    const zipPath = `${FileSystem.cacheDirectory}songjournal_backup.zip`;
    await zip(zipPath, backupDir);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(zipPath);
    } else {
      throw new Error('Sharing is not available on this device');
    }

    await FileSystem.deleteAsync(backupDir, { idempotent: true });
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
