import * as FileSystem from 'expo-file-system';

import { documentsDirectory } from '@src/components/common/constants';

const createSongJournalFolder = async () => {
  const folderInfo = await FileSystem.getInfoAsync(documentsDirectory);

  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(documentsDirectory, {
      intermediates: true,
    });
    console.log('Folder created:', documentsDirectory);
  } else {
    console.log('Folder already exists:', documentsDirectory);
  }
};

export default createSongJournalFolder;
