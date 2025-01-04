import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { uploadFileToDropbox } from '@src/data/utils/uploadToDropbox';

export const DropboxUploadTest = () => {
  const localFilePath =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Print/fdbab6aa-5ce0-47ab-a307-05d40ecb3176.pdf';

  const dropboxPath = 'example4.pdf';

  const onPress = async () => {
    const fileContent = await FileSystem.readAsStringAsync(localFilePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const fileContentBinary = Buffer.from(fileContent, 'base64');

    uploadFileToDropbox(dropboxPath, fileContentBinary);
  };

  return (
    <Button title="Upload file to dropbox" onPress={onPress} color="red" />
  );
};
