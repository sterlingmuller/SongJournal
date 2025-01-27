import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import {
  getValidAccessToken,
  uploadFileToDropbox,
} from '@dropbox/helpers/uploadToDropbox';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSyncFilters } from '@src/state/selectors/settingsSelector';
import useAddToUploadQueue from '@src/services/cloudStorage/useAddToUploadQueue';
import { useNetworkStatus } from '@src/state/context/NetworkContext';
import { createDropboxFolder } from '@src/services/cloudStorage/dropbox/helpers/createDropBoxFolder';
import { generateBuffer } from '@dropbox/helpers/generateBuffer';
import { CloudFileType } from '@src/components/common/enums';
import { createBackup } from '@src/utils/createAndShareBackup';

const useDropboxFileGenerator = () => {
  const { isOnline } = useNetworkStatus();
  const { addToUploadQueue } = useAddToUploadQueue();

  const generateAndUploadFile = async (
    songTitle: string,
    uri: string,
    cloudFileType: CloudFileType,
    takeTitle?: string,
  ) => {
    let path: string;
    let content: Buffer;

    switch (cloudFileType) {
      case CloudFileType.TAKE:
        {
          path = `/${songTitle}/Takes/${takeTitle}.mp3`;
          content = await generateBuffer(uri);
        }
        break;
      case CloudFileType.STARRED_TAKE:
        {
          path = `/${songTitle}/${songTitle}.mp3`;
          content = await generateBuffer(uri);
        }
        break;
      case CloudFileType.PAGE:
        {
          path = `/${songTitle}/Lyrics.pdf`;
          content = await generateBuffer(uri);
        }
        break;
      case CloudFileType.ZIP: {
        const localZipPath = await createBackup();

        path = 'songjournal_backup.zip';
        content = await generateBuffer(localZipPath);
      }
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
  };

  return generateAndUploadFile;
};

export default useDropboxFileGenerator;
