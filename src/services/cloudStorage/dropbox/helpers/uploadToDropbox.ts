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

export const getValidAccessToken = async () => {
  const expiry = await getAccessTokenExpiry();

  if (expiry && Date.now() < expiry) {
    return await getAccessToken();
  } else {
    return await refreshAccessToken();
  }
};

export const uploadFilesInBatch = async (
  files: { path: string; content: Buffer }[],
  accessToken: string,
) => {
  const entries = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sessionId = await startUploadSession(file.content, accessToken);
    const isLastFile = i === files.length - 1;

    await appendToUploadSession(
      sessionId,
      file.content,
      accessToken,
      0,
      isLastFile,
    );

    entries.push({
      cursor: { session_id: sessionId, offset: file.content.length },
      commit: {
        path: `${file.path}`,
        mode: 'overwrite',
        autorename: false,
        mute: false,
      },
    });
  }

  await finishUploadSessionBatch(entries, accessToken);
};

export const uploadFileToDropbox = async (
  filePath: string,
  fileContent: Buffer,
) => {
  const accessToken = await getValidAccessToken();

  const response = await fetch(
    'https://content.dropboxapi.com/2/files/upload',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: `/${filePath}`,
          mode: 'overwrite',
          autorename: false,
          mute: false,
          strict_conflict: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
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
