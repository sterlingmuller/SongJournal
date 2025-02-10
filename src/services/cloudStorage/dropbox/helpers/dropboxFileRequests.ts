import {
  getAccessToken,
  getAccessTokenExpiry,
} from '@src/data/utils/tokenStorage';
import { refreshAccessToken } from '@src/data/utils/authService';
import {
  startUploadSession,
  appendToUploadSession,
  finishUploadSessionBatch,
} from '@dropbox/helpers/batchUploadApiRequests';
import { generateBuffer } from './generateBuffer';
import { createDropboxFolder } from './createDropBoxFolder';

export const getValidAccessToken = async () => {
  const expiry = await getAccessTokenExpiry();

  if (expiry && Date.now() < expiry) {
    return await getAccessToken();
  } else {
    return await refreshAccessToken();
  }
};

export const uploadFilesInBatch = async (
  files: { path: string; uri: string; songTitle: string }[],
) => {
  const entries = [];
  const accessToken = await getValidAccessToken();

  for (let i = 0; i < files.length; i++) {
    const { path, uri, songTitle } = files[i];

    createDropboxFolder(songTitle);
    const contentBuffer = await generateBuffer(uri);

    const sessionId = await startUploadSession(contentBuffer, accessToken);

    const offset = contentBuffer.length;

    await appendToUploadSession(sessionId, contentBuffer, accessToken, offset);

    entries.push({
      cursor: { session_id: sessionId, offset },
      commit: {
        path: path,
        mode: 'overwrite',
        autorename: false,
        mute: false,
      },
    });
  }

  await finishUploadSessionBatch(entries, accessToken);
};

export const uploadFileToDropbox = async (
  path: string,
  contentBuffer: Buffer,
  accessToken: string,
) => {
  const response = await fetch(
    'https://content.dropboxapi.com/2/files/upload',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: path,
          mode: 'overwrite',
          autorename: false,
          mute: false,
          strict_conflict: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: contentBuffer,
    },
  );

  const data = await response.json();
  if (!response.ok) {
    console.error('Error uploading file:', data);
  } else {
    const { rev: revisionId } = data;

    // await updateFileOnDb(filePath, revisionId)
  }
};

export const deleteFileFromDropbox = async (
  path: string,
  accessToken: string,
) => {
  try {
    await fetch('https://api.dropboxapi.com/2/files/delete_v2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
      }),
    });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

export const renameFileOnDropbox = async (
  currentPath: string,
  newPath: string,
  accessToken: string,
) => {
  try {
    await fetch('https://api.dropboxapi.com/2/files/move_v2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_path: currentPath,
        to_path: newPath,
      }),
    });
  } catch (error) {
    console.error('Error renaming file:', error);
  }
};
