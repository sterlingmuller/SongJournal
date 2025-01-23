import { getValidAccessToken } from '@src/data/utils/uploadToDropbox';

const doesFolderExists = async (folderPath: string, accessToken: string) => {
  try {
    const response = await fetch(
      'https://api.dropboxapi.com/2/files/get_metadata',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: folderPath }),
      },
    );

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      if (data.error_summary.includes('path/not_found')) {
        return false;
      } else {
        console.error('Error checking folder existence:', data);
        return false;
      }
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
};

export const createDropboxFolder = async (songTitle: string) => {
  const folderPath = `/${songTitle}`;
  const accessToken = await getValidAccessToken();

  if (await doesFolderExists(folderPath, accessToken)) {
    return;
  }

  try {
    const response = await fetch(
      'https://api.dropboxapi.com/2/files/create_folder_v2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: folderPath, autorename: false }),
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
