import * as FileSystem from 'expo-file-system';

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
