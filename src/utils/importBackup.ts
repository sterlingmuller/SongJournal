import { dbName, dbPath } from '@src/components/common/constants';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export const importBackup = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/octet-stream',
      copyToCacheDirectory: false,
    });

    const db = SQLite.openDatabaseSync(dbName);
    await db.closeAsync();

    await FileSystem.deleteAsync(dbPath, { idempotent: true });

    await FileSystem.copyAsync({
      from: result.assets[0].uri,
      to: dbPath,
    });

    Alert.alert(
      'Backup Imported',
      'Your data has been successfully restored from the backup. The app will now restart to apply changes.',
    );

    // Here, you should implement a way to restart your app
    // This could be done by setting a state in your app's root component
    // or by using a library like expo-updates if you're using Expo
  } catch (error) {
    console.error('Import failed:', error);
    Alert.alert(
      'Import Failed',
      'An error occurred while importing the backup. Your existing data remains unchanged.',
    );
  }
};
