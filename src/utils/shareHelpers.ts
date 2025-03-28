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

export const shareZip = async (
  zipPath: string,
  formattedTitle?: string,
  title?: string,
) => {
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
        deleteFiles(zipPath, formattedTitle);
      }, 1000);
    }

    if (result.success) {
      deleteFiles(zipPath, formattedTitle);
      Alert.alert(
        'Share Successful',
        title
          ? 'An error occurred while sharing your song folder.'
          : 'Your backup has been created and shared.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Share Failed',
      title
        ? `${title} has been shared.`
        : 'An error occurred while creating the backup.',
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
      }, 100);
    }

    if (result.success) {
      deleteFiles(path);
      Alert.alert('Share Successful', `${title} has been shared.`);
    }
  } catch (error) {
    Alert.alert(
      'Share Failed',
      'An error occurred while sharing your audio file.',
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
      }, 100);
    }

    if (result.success) {
      deleteFiles(path);
      Alert.alert(`Share Successful`, `${title} have been shared.`);
    }
  } catch (error) {
    Alert.alert(
      'Share Failed',
      'An error occurred while sharing your lyrics pdf.',
    );
  }
};
