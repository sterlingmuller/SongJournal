import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadFilesInBatch } from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';

const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

interface FileToUpload {
  path: string;
  content: Buffer;
}

const useUploadQueue = () => {
  const loadUploadQueue = async () => {
    const storedQueue = await AsyncStorage.getItem(UPLOAD_QUEUE_KEY);

    if (storedQueue) {
      return JSON.parse(storedQueue);
    }
    return [];
  };

  const processUploadQueue = useCallback(async () => {
    const uploadQueue = await loadUploadQueue();

    if (uploadQueue.length > 0) {
      await uploadFilesInBatch(uploadQueue);
      await AsyncStorage.removeItem(UPLOAD_QUEUE_KEY);
    }
  }, []);

  return { processUploadQueue };
};

export default useUploadQueue;
