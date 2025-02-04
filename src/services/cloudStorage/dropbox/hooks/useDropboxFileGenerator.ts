import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import {
  deleteFileFromDropbox,
  getValidAccessToken,
  uploadFileToDropbox,
} from '@dropbox/helpers/uploadToDropbox';
import useAddToUploadQueue from '@src/services/cloudStorage/useAddToUploadQueue';
import { useNetworkStatus } from '@src/state/context/NetworkContext';
import { createDropboxFolder } from '@src/services/cloudStorage/dropbox/helpers/createDropBoxFolder';
import { generateBuffer } from '@dropbox/helpers/generateBuffer';
import { CloudFileType } from '@src/components/common/enums';
import { createBackup } from '@src/utils/createAndShareBackup';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSyncFilters } from '@src/state/selectors/settingsSelector';
import { selectCurrentSongCompletionStatus } from '@src/state/selectors/songsSelector';

const useDropboxFileGenerator = () => {
  const { isOnline } = useNetworkStatus();
  const { addToUploadQueue } = useAddToUploadQueue();
  const { isCompletedSongConditionEnabled } = useAppSelector(selectSyncFilters);
  const completed = useAppSelector(selectCurrentSongCompletionStatus);

  const generateAndUploadZipBuffer = async () => {
    const localZipPath = await createBackup();

    const path = '/songjournal_backup.zip';
    const content = await generateBuffer(localZipPath);

    const fileToUpload = {
      path,
      content,
    };

    if (isOnline) {
      const accessToken = await getValidAccessToken();

      await uploadFileToDropbox(fileToUpload, accessToken);

      await FileSystem.deleteAsync(localZipPath, { idempotent: true });
    } else {
      console.error(
        'Upload failed: No internet connection. Please check your network settings and try again.',
      );
    }
  };

  const generateAndUploadFile = async (
    songTitle: string,
    uri: string,
    cloudFileType: CloudFileType,
    takeTitle?: string,
  ) => {
    if (
      (isCompletedSongConditionEnabled && completed) ||
      !isCompletedSongConditionEnabled
    ) {
      let path: string;
      let content: Buffer;

      switch (cloudFileType) {
        case CloudFileType.TAKE:
          {
            path = `/${songTitle}/Takes/${takeTitle}.m4a`;
            content = await generateBuffer(uri);
          }
          break;
        case CloudFileType.STARRED_TAKE:
          {
            path = `/${songTitle}/${songTitle}.m4a`;
            content = await generateBuffer(uri);
          }
          break;
        case CloudFileType.PAGE:
          {
            path = `/${songTitle}/Lyrics.pdf`;
            content = await generateBuffer(uri);
          }
          break;
      }

      const fileToUpload = {
        path,
        content,
      };

      if (isOnline) {
        const accessToken = await getValidAccessToken();

        await createDropboxFolder(songTitle);

        await uploadFileToDropbox(fileToUpload, accessToken);
      } else {
        addToUploadQueue(fileToUpload);
      }
    }
  };

  const deleteFile = async (songTitle: string, takeTitle: string) => {
    if (isOnline) {
      const path = `/${songTitle}/Takes/${takeTitle}.m4a`;
      const accessToken = await getValidAccessToken();

      await deleteFileFromDropbox(path, accessToken);
    }
  };

  return { generateAndUploadFile, generateAndUploadZipBuffer, deleteFile };
};

export default useDropboxFileGenerator;
