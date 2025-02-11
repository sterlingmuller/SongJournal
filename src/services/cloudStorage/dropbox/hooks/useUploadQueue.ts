import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadFilesInBatch } from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';
import { UPLOAD_QUEUE_KEY } from '@src/components/common/constants';

interface FileToUpload {
  path: string;
  uri: string;
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
    const uploadQueue: FileToUpload[] = await loadUploadQueue();

    if (uploadQueue.length > 0) {
      await uploadFilesInBatch(uploadQueue);
      await AsyncStorage.removeItem(UPLOAD_QUEUE_KEY);
    }
  }, []);

  return { processUploadQueue };
};

export default useUploadQueue;
