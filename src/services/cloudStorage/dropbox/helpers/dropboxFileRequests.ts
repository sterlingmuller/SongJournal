import {
  getAccessToken,
  getAccessTokenExpiry,
} from '@src/data/utils/tokenStorage';
import { refreshAccessToken } from '@src/data/utils/authService';
import {
  startUploadSession,
  appendToUploadSession,
  finishUploadSessionBatch,
  startUploadSessionsBatch,
} from '@dropbox/helpers/batchUploadApiRequests';

export const getValidAccessToken = async () => {
  const expiry = await getAccessTokenExpiry();

  if (expiry && Date.now() < expiry) {
    return await getAccessToken();
  } else {
    return await refreshAccessToken();
  }
};

// alright, things are getting a little screwy here
// I don't think we need to appendToUploadSession
// my understanding is that is when a file is too large, you split up into chunks
// you append the remainder chunks onto that files session
// When no chunks are being appended, set close to true for the start session
// if appending, close is false, the final append close is true

// I think since our files won't be 8mb, we can skip chunking and appending. Just start a session, add the entry, finish the batch with all entries

// files are being uploaded however, they are corrupt.
// I think there is another issue with our buffers, they work fine when uploading directly, not coming from the queue
// one weird thing, in the buffer generator, I could buffer.byteLength and get a value.
// here that returns unknown, the buffer array is insteadf on the data key, so I have to do content.data.length to get the value
// this may be getting converted in some weird way, impacting the file upload.

// other thing to look into, using the start_batch api route instead of start

export const uploadFilesInBatch = async (
  files: { path: string; content: Buffer }[],
) => {
  const entries = [];
  const accessToken = await getValidAccessToken();

  // let offset = 0;

  for (let i = 0; i < files.length; i++) {
    const { path, content: buffer } = files[i];
    const sessionId = await startUploadSession(buffer, accessToken);
    // const isLastFile = i === files.length - 1;

    await appendToUploadSession(
      sessionId,
      buffer,
      accessToken,
      0,
      // isLastFile,
    );

    entries.push({
      cursor: { session_id: sessionId, offset: 0 },
      commit: {
        path: path,
        mode: 'overwrite',
        autorename: false,
        mute: false,
      },
    });

    //   // offset += file.content.data.length;
  }

  console.log('here we go!');

  // const sessionIds = await startUploadSessionsBatch(files.length, accessToken);

  // for (let i = 0; i < files.length; i++) {
  //   const file = files[i];
  //   const sessionId = sessionIds[i];

  //   try {
  //     await appendToUploadSession(sessionId, file.content, accessToken, 0);

  //     console.log('bytes:', file.content.data.length);

  //     entries.push({
  //       cursor: { session_id: sessionId, offset: 0 },
  //       commit: {
  //         path: file.path,
  //         mode: 'overwrite',
  //         autorename: false,
  //         mute: false,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(`Failed to upload file: ${file.path}`, error);
  //   }
  // }

  await finishUploadSessionBatch(entries, accessToken);
};

export const uploadFileToDropbox = async (
  file: {
    path: string;
    content: Buffer;
  },
  accessToken: string,
) => {
  const response = await fetch(
    'https://content.dropboxapi.com/2/files/upload',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: file.path,
          mode: 'overwrite',
          autorename: false,
          mute: false,
          strict_conflict: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: file.content,
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
