import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { uploadFileToDropbox } from '@src/data/utils/uploadToDropbox';

export const DropboxUploadTest = () => {
  const localFilePath =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Print/fdbab6aa-5ce0-47ab-a307-05d40ecb3176.pdf';

  const audioFile =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Audio/recording-9f471474-6472-4b3f-bf2a-05d2a2d738e8.m4a';

  // const dropboxPath = 'example4.pdf';
  const dropboxPathAudio = 'audioTest.mp3';

  const onPress = async () => {
    const fileContent = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const fileContentBinary = Buffer.from(fileContent, 'base64');

    uploadFileToDropbox(dropboxPathAudio, fileContentBinary);
  };

  return (
    <Button title="Upload file to dropbox" onPress={onPress} color="red" />
  );
};
