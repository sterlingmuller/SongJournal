import { useState, useCallback, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
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
    const storedQueue = await SecureStore.getItemAsync(UPLOAD_QUEUE_KEY);
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
      await uploadFilesInBatch(uploadQueue, accessToken);
      setUploadQueue([]);
      await SecureStore.deleteItemAsync(UPLOAD_QUEUE_KEY);
    }
  }, [uploadQueue]);

  return { processUploadQueue };
};

export default useUploadQueue;
