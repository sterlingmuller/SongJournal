import * as FileSystem from 'expo-file-system';

import { documentsDirectory } from '@src/components/common/constants';

const newSongFolderPath = documentsDirectory + 'New Song';

const createSongFolder = async () => {
  const folderInfo = await FileSystem.getInfoAsync(newSongFolderPath);

  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(newSongFolderPath, {
      intermediates: true,
    });
    console.log('Folder created:', newSongFolderPath);
  } else {
    console.log('Folder already exists:', newSongFolderPath);
  }
};

export default createSongFolder;
