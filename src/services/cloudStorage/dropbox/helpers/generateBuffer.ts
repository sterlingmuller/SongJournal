import { File } from 'expo-file-system/next';
import { Buffer } from 'buffer';

export const generateBuffer = async (uri: string) => {
  const fileObj = new File(uri);

  const fileHandle = fileObj.open();
  const fileBytes = fileHandle.readBytes(fileHandle.size);

  const buffer = Buffer.from(fileBytes);

  return buffer;
};
