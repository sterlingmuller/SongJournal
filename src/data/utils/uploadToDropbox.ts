import {
  getAccessToken,
  getAccessTokenExpiry,
} from '@src/data/utils/tokenStorage';
import { refreshAccessToken } from '@src/data/utils/authService';

const getValidAccessToken = async () => {
  const expiry = await getAccessTokenExpiry();

  if (expiry && Date.now() > expiry) {
    return await getAccessToken();
  } else {
    return await refreshAccessToken();
  }
};

const createDropboxFolder = async (folderPath: string) => {
  const accessToken = await getValidAccessToken();

  try {
    const response = await fetch(
      'https://api.dropboxapi.com/2/files/create_folder_v2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: `/${folderPath}`, autorename: false }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      console.error('Error creating folder:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
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

export const backupSong = async (
  songTitle: string,
  lyricsPdf?: Buffer,
  selectedSong?: Buffer,
  takes?: { title: string; takeBuffer: Buffer }[],
) => {
  console.log('takes', takes);
  const basePath = `${songTitle}`;
  await createDropboxFolder(basePath);

  if (lyricsPdf) {
    await uploadFileToDropbox(`${basePath}/${songTitle} Lyrics.pdf`, lyricsPdf);
  }

  if (selectedSong) {
    await uploadFileToDropbox(`${basePath}/${songTitle}.mp3`, selectedSong);
  }

  if (takes.length > 0) {
    await createDropboxFolder(`${basePath}/Takes`);

    for (const take of takes) {
      await uploadFileToDropbox(
        `${basePath}/Takes/${take.title}`,
        take.takeBuffer,
      );
    }
  }
};
