import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export const requestMicrophonePermissions = async () => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    return status;
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const requestReadStoragePermissions = async () => {
  try {
    const { granted } =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    return granted;
  } catch (err) {
    console.warn(err);
    return null;
  }
};
