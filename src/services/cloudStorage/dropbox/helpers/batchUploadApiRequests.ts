export const startUploadSession = async (
  fileContent: Buffer,
  accessToken: string
) => {
  const response = await fetch(
    'https://content.dropboxapi.com/2/files/upload_session/start',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ close: true }),
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
    }
  );

  const data = await response.json();
  return data.session_id;
};

export const appendToUploadSession = async (
  sessionId: string,
  fileContent: Buffer,
  accessToken: string,
  offset: number
) => {
  await fetch(
    'https://content.dropboxapi.com/2/files/upload_session/append_v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          cursor: { session_id: sessionId, offset },
          close: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
    }
  );
};

export const finishUploadSessionBatch = async (
  entries: {
    cursor: { session_id: string; offset: number };
    commit: { path: string; mode: string; autorename: boolean; mute: boolean };
  }[],
  accessToken: string
) => {
  const response = await fetch(
    'https://api.dropboxapi.com/2/files/upload_session/finish_batch_v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entries }),
    }
  );

  if (!response.ok) {
    console.error('Error finishing upload session batch');
  } else {
    // iterate over entries, upload rev to db
  }
};
