import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

import { dbPath } from '@src/components/common/constants';

const createAndShareBackup = async () => {
  try {
    const backupPath = FileSystem.cacheDirectory + 'SongJournal_Backup.db';

    await FileSystem.copyAsync({
      from: dbPath,
      to: backupPath,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(backupPath, {
        mimeType: 'application/octet-stream',
        dialogTitle: 'Share SongJournal Backup',
      });
      Alert.alert('Backup shared!');
    } else {
      Alert.alert(
        'Sharing not available',
        'Sharing is not available on this device',
      );
    }

    await FileSystem.deleteAsync(backupPath, { idempotent: true });
  } catch (error) {
    console.error('Backup failed:', error);
    Alert.alert(
      'Backup Failed',
      'An error occurred while creating the backup.',
    );
  }
};

export default createAndShareBackup;
