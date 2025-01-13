import {
  getAccessToken,
  getAccessTokenExpiry,
} from '@src/data/utils/tokenStorage';
import { refreshAccessToken } from '@src/data/utils/authService';

export const getValidAccessToken = async () => {
  const expiry = await getAccessTokenExpiry();

  if (expiry && Date.now() < expiry) {
    return await getAccessToken();
  } else {
    return await refreshAccessToken();
  }
};

export const uploadFileToDropbox = async (
  filePath: string,
  fileContent: Buffer,
) => {
  const accessToken = await getValidAccessToken();

  try {
    const response = await fetch(
      'https://content.dropboxapi.com/2/files/upload',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: `/${filePath}`,
            mode: 'add',
            autorename: true,
            mute: false,
            strict_conflict: false,
          }),
          'Content-Type': 'application/octet-stream',
        },
        body: fileContent,
      },
    );

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
    if (!response.ok) {
      console.error('Error uploading file:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

const startUploadSession = async (fileContent: Buffer, accessToken: string) => {
  const response = await fetch(
    'https://content.dropboxapi.com/2/files/upload_session/start',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ close: false }),
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
    },
  );

  const data = await response.json();
  return data.session_id;
};

const appendToUploadSession = async (
  sessionId: string,
  fileContent: Buffer,
  accessToken: string,
  offset: number,
  close: boolean,
) => {
  await fetch(
    'https://content.dropboxapi.com/2/files/upload_session/append_v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          cursor: { session_id: sessionId, offset },
          close,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
    },
  );
};

const finishUploadSessionBatch = async (
  entries: {
    cursor: { session_id: string; offset: number };
    commit: { path: string; mode: string; autorename: boolean; mute: boolean };
  }[],
  accessToken: string,
) => {
  console.log('entries:', JSON.stringify(entries));
  const response = await fetch(
    'https://api.dropboxapi.com/2/files/upload_session/finish_batch_v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entries }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error('Error finishing upload session batch:', data);
  } else {
    console.log('Successfully finished upload session batch:', data);

    console.log('first failure:', data.entries[0].failure);
  }
  return data;
};

const checkUploadSessionBatchStatus = async (
  jobId: string,
  accessToken: string,
) => {
  try {
    const response = await fetch(
      'https://api.dropboxapi.com/2/files/upload_session/finish_batch/check',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ async_job_id: jobId }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error('Error checking upload session batch status:', data);
    } else {
      console.log('Upload session batch status:', data);
      if (data['.tag'] === 'complete') {
        data.entries.forEach((entry: any, index: number) => {
          if (entry['.tag'] === 'failure') {
            console.error(`Entry ${index} failed:`, entry.failure);
          }
        });
      }
    }
    return data;
  } catch (error) {
    console.error('Network error:', error);
  }
};

export const uploadFilesInBatch = async (
  files: { path: string; content: Buffer }[],
  accessToken: string,
) => {
  const entries = [];

  console.log('uploading files in batch:', files);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sessionId = await startUploadSession(file.content, accessToken);
    console.log('sessionId:', sessionId);
    const isLastFile = i === files.length - 1;

    await appendToUploadSession(
      sessionId,
      file.content,
      accessToken,
      0,
      isLastFile,
    );

    console.log('file path:', file.path);

    entries.push({
      cursor: { session_id: sessionId, offset: file.content.length },
      commit: {
        path: `${file.path}`,
        mode: 'add',
        autorename: true,
        mute: false,
      },
    });
  }

  // everythings looking good but think we're having issues here
  // getting not_closed failure
  const result = await finishUploadSessionBatch(entries, accessToken);
  if (result['.tag'] === 'async_job_id') {
    await checkUploadSessionBatchStatus(result.async_job_id, accessToken);
  }
};
