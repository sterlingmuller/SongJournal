import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

export const generateBuffer = async (uri: string) => {
  const content = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const buffer = Buffer.from(content, 'base64');

  return buffer;
};
