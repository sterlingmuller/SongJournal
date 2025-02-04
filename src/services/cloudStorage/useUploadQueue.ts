import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getValidAccessToken,
  uploadFilesInBatch,
} from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';

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
    if (uploadQueue.length > 0) {
      const accessToken = await getValidAccessToken();
      await uploadFilesInBatch(uploadQueue, accessToken);
      setUploadQueue([]);
      await AsyncStorage.removeItem(UPLOAD_QUEUE_KEY);
    }
  }, [uploadQueue]);

  return { processUploadQueue };
};

export default useUploadQueue;
