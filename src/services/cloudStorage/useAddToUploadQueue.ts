import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

interface FileToUpload {
  path: string;
  content: Buffer;
}

const useAddToUploadQueue = () => {
  const addToUploadQueue = useCallback(
    async (files: FileToUpload[] | FileToUpload) => {
      const storedQueue = await AsyncStorage.getItem(UPLOAD_QUEUE_KEY);
      const filesArray = Array.isArray(files) ? files : [files];

      const uploadQueue = storedQueue ? JSON.parse(storedQueue) : [];
      const newQueue: FileToUpload[] = [...uploadQueue, ...filesArray];

      await AsyncStorage.setItem(UPLOAD_QUEUE_KEY, JSON.stringify(newQueue));

      console.log('new queue:', newQueue);
    },
    [],
  );

  return { addToUploadQueue };
};

export default useAddToUploadQueue;
