import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

interface FileToUpload {
  path: string;
  content: Buffer;
}

const useAddToUploadQueue = () => {
  const addToUploadQueue = useCallback(async (files: FileToUpload[]) => {
    const storedQueue = await SecureStore.getItemAsync(UPLOAD_QUEUE_KEY);

    // once I get this working, update this so I don't have to parse the storedQueue. I should just stringify the files and concatinate them with the storedQueue

    const uploadQueue = storedQueue ? JSON.parse(storedQueue) : [];
    const newQueue = [...uploadQueue, ...files];

    await SecureStore.setItemAsync(UPLOAD_QUEUE_KEY, JSON.stringify(newQueue));
  }, []);

  return { addToUploadQueue };
};

export default useAddToUploadQueue;
