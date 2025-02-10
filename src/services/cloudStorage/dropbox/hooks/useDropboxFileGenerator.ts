import * as FileSystem from 'expo-file-system';

import {
  deleteFileFromDropbox,
  getValidAccessToken,
  renameFileOnDropbox,
  uploadFileToDropbox,
} from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';
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
    const bufferContent = await generateBuffer(localZipPath);

    if (isOnline) {
      const accessToken = await getValidAccessToken();

      await uploadFileToDropbox(path, bufferContent, accessToken);

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

      switch (cloudFileType) {
        case CloudFileType.TAKE:
          path = `/${songTitle}/Takes/${takeTitle}.m4a`;
          break;
        case CloudFileType.STARRED_TAKE:
          path = `/${songTitle}/${songTitle}.m4a`;
          break;
        case CloudFileType.PAGE:
          path = `/${songTitle}/Lyrics.pdf`;
          break;
      }

      if (isOnline) {
        const accessToken = await getValidAccessToken();
        const contentBuffer = await generateBuffer(uri);

        await createDropboxFolder(songTitle);

        await uploadFileToDropbox(path, contentBuffer, accessToken);
      } else {
        addToUploadQueue({ path, uri });
      }
    }
  };

  const generateFileDeletion = async (songTitle: string, takeTitle: string) => {
    if (isOnline) {
      const path = `/${songTitle}/Takes/${takeTitle}.m4a`;
      const accessToken = await getValidAccessToken();

      await deleteFileFromDropbox(path, accessToken);
    }
  };

  const generateSongRename = async (
    currentSongTitle: string,
    newSongTitle: string,
  ) => {
    if (isOnline) {
      const currentFolderPath = `/${currentSongTitle}`;
      const newFolderPath = `/${newSongTitle}`;
      const accessToken = await getValidAccessToken();

      await renameFileOnDropbox(currentFolderPath, newFolderPath, accessToken);

      const currentPath = `${newFolderPath}/${currentSongTitle}.m4a`;
      const newPath = `/${newSongTitle}/${newSongTitle}.m4a`;

      await renameFileOnDropbox(currentPath, newPath, accessToken);
    }
  };

  const generateTakeRename = async (
    currentTakeTitle: string,
    newTakeTitle: string,
    songTitle: string,
  ) => {
    if (isOnline) {
      const currentPath = `/${songTitle}/Takes/${currentTakeTitle}.m4a`;
      const newPath = `/${songTitle}/Takes/${newTakeTitle}.m4a`;
      const accessToken = await getValidAccessToken();

      await renameFileOnDropbox(currentPath, newPath, accessToken);
    }
  };

  return {
    generateAndUploadFile,
    generateAndUploadZipBuffer,
    generateFileDeletion,
    generateSongRename,
    generateTakeRename,
  };
};

export default useDropboxFileGenerator;
