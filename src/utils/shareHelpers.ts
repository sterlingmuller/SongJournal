import { Platform, Alert } from 'react-native';
import Share from 'react-native-share';
import * as FileSystem from 'expo-file-system';
import { ShareOpenResult } from 'react-native-share/lib/typescript/types';
import { formatDateFromISOString } from './formateDateFromISOString';

export const deleteFiles = (uri: string, title?: string) => {
  FileSystem.deleteAsync(uri, { idempotent: true });
  if (title) {
    FileSystem.deleteAsync(`${FileSystem.cacheDirectory}${title}.zip`, {
      idempotent: true,
    });
  }
};

export const shareZip = async (zipPath: string, title?: string) => {
  const fileUrl = Platform.OS === 'android' ? `file://${zipPath}` : zipPath;
  const normalizedTitle = title || 'Song Journal Backup';

  const shareOptions = {
    title: normalizedTitle,
    subject: normalizedTitle,
    message: `${normalizedTitle} - ${new Date().toLocaleDateString()}`,
    url: fileUrl,
    type: 'application/zip',
    failOnCancel: false,
    saveToFiles: true,
    excludedActivityTypes: ['com.facebook.orca'],
  };

  try {
    const result: ShareOpenResult = await Share.open(shareOptions);

    if (result.message === 'CANCELED') {
      setTimeout(() => {
        deleteFiles(zipPath, title);
      }, 1000);
    }

    if (result.success) {
      deleteFiles(zipPath, title);
      Alert.alert(
        'Backup Successful',
        'Your backup has been created and shared.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Backup Failed',
      'An error occurred while creating the backup.',
    );
  }
};

export const shareAudio = async (path: string, title: string, date: string) => {
  const fileUrl = Platform.OS === 'android' ? `file://${path}` : path;
  const formattedDate = formatDateFromISOString(date);

  const shareOptions = {
    title: title,
    subject: title,
    message: `${title}\nCreated: ${formattedDate}`,
    url: fileUrl,
    type: 'audio/mp4',
    failOnCancel: false,
    saveToFiles: true,
  };

  try {
    const result: ShareOpenResult = await Share.open(shareOptions);

    if (result.message === 'CANCELED') {
      setTimeout(() => {
        deleteFiles(path);
        Alert.alert(`Success`, `${title} has been shared.`);
      }, 100);
    }

    if (result.success) {
      deleteFiles(path);
      Alert.alert(
        'Backup Successful',
        'Your backup has been created and shared.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Backup Failed',
      'An error occurred while creating the backup.',
    );
  }
};

export const sharePdf = async (path: string, title: string) => {
  const fileUrl = Platform.OS === 'android' ? `file://${path}` : path;

  const shareOptions = {
    title: title,
    subject: title,
    message: title,
    url: fileUrl,
    type: 'application/pdf',
    failOnCancel: false,
    saveToFiles: true,
  };

  try {
    const result: ShareOpenResult = await Share.open(shareOptions);

    if (result.message === 'CANCELED') {
      setTimeout(() => {
        deleteFiles(path);
        Alert.alert(`Success`, `${title} has been shared.`);
      }, 100);
    }

    if (result.success) {
      deleteFiles(path);
      Alert.alert(
        'Backup Successful',
        'Your backup has been created and shared.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Backup Failed',
      'An error occurred while creating the backup.',
    );
  }
};
