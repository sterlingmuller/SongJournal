import { getAccessToken } from '@src/data/utils/tokenStorage';

const createDropboxFolder = async (folderPath: string) => {
  const accessToken = await getAccessToken();
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
  const accessToken = await getAccessToken();

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
    if (response.ok) {
      console.log('File uploaded:', data);
    } else {
      console.error('Error uploading file:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export const backupSong = async (
  songTitle: string,
  // lyricsHtml: Buffer,
  lyricsPdf: Buffer,
  takes: { [key: string]: Buffer },
  selectedSong: Buffer,
) => {
  const basePath = `${songTitle}`;
  await createDropboxFolder(basePath);
  await createDropboxFolder(`${basePath}/Lyrics`);
  await createDropboxFolder(`${basePath}/Takes`);

  // await uploadFileToDropbox(`${basePath}/Lyrics/lyrics.html`, lyricsHtml);
  await uploadFileToDropbox(`${basePath}/Lyrics/lyrics.pdf`, lyricsPdf);

  for (const [takeName, takeContent] of Object.entries(takes)) {
    await uploadFileToDropbox(`${basePath}/Takes/${takeName}`, takeContent);
  }

  await uploadFileToDropbox(`${basePath}/selected_song.mp3`, selectedSong);
};
