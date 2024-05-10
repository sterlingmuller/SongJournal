import * as FileSystem from 'expo-file-system';

import { documentsDirectory } from '@src/common/constants';

const textFilePath = documentsDirectory + 'Lyrics';

const useCreateLyrics = async () => {
  const textContent = 'Hello, this is an example text document!';
  try {
    await FileSystem.writeAsStringAsync(textFilePath, textContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log('File saved at:', textFilePath);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

export default useCreateLyrics;
