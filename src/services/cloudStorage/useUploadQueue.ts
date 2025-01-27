import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getValidAccessToken,
  uploadFilesInBatch,
} from '@src/data/utils/uploadToDropbox';

const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

interface FileToUpload {
  path: string;
  content: Buffer;
}

const useUploadQueue = () => {
  const [uploadQueue, setUploadQueue] = useState<FileToUpload[]>([]);

  const loadUploadQueue = useCallback(async () => {
    const storedQueue = await AsyncStorage.getItem(UPLOAD_QUEUE_KEY);

    if (storedQueue) {
      setUploadQueue(JSON.parse(storedQueue));
    }
  }, []);

  useEffect(() => {
    loadUploadQueue();
  }, [loadUploadQueue]);

  const processUploadQueue = useCallback(async () => {
    console.log('uploadQueue:', uploadQueue);
    if (uploadQueue.length > 0) {
      const accessToken = await getValidAccessToken();
      console.log('got access token');
      await uploadFilesInBatch(uploadQueue, accessToken);
      console.log('after upload');
      setUploadQueue([]);
      await AsyncStorage.removeItem(UPLOAD_QUEUE_KEY);
    }
  }, [uploadQueue]);

  return { processUploadQueue };
};

export default useUploadQueue;
