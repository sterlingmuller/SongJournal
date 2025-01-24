import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

interface FileToUpload {
  path: string;
  content: Buffer;
}

const useAddToUploadQueue = () => {
  const addToUploadQueue = useCallback(async (files: FileToUpload[]) => {
    const storedQueue = await AsyncStorage.getItem(UPLOAD_QUEUE_KEY);

    // once I get this working, update this so I don't have to parse the storedQueue. I should just stringify the files and concatenate them with the storedQueue

    const uploadQueue = storedQueue ? JSON.parse(storedQueue) : [];
    const newQueue = [...uploadQueue, ...files];

    await AsyncStorage.setItem(UPLOAD_QUEUE_KEY, JSON.stringify(newQueue));

    console.log('new queue:', newQueue);
  }, []);

  return { addToUploadQueue };
};

export default useAddToUploadQueue;
