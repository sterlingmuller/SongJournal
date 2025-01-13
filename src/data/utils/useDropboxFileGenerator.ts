import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import {
  getValidAccessToken,
  uploadFilesInBatch,
} from '@src/data/utils/uploadToDropbox';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import { Page, Song, SongToPageMap, Take } from '@src/components/common/types';
import { fetchPages } from '../repositories/PageRepository';
import { useSQLiteContext } from 'expo-sqlite';
import { useArtistName } from '@src/utils/hooks/useArtistName';
import { generatePagePdf } from '@src/utils/generatePagePdf';

const useDropboxSongFolderGenerator = () => {
  const db = useSQLiteContext();
  const songs = useAppSelector(selectSongs);
  const [pages, setPages] = useState<SongToPageMap>({});
  const [trigger, setTrigger] = useState(false);

  const { getArtistName } = useArtistName();

  const generatePdf = async (title: string, page: Page, artistId: number) => {
    const artist = getArtistName(artistId);
    const pdfUri = await generatePagePdf(title, page, artist);

    return pdfUri;
  };

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

  const createDropboxFolder = async (folderPath: string) => {
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

  useEffect(() => {
    const fetchPagesData = async () => {
      const fetchedPages = await fetchPages(db);
      setPages(fetchedPages);
    };

    fetchPagesData();
  }, [db]);

  const generateSongBuffers = async (song: Song, page: Page) => {
    const { title, selectedTakeId, takes, completed } = song;

    let lyricsBuffer: Buffer | undefined;
    let selectedTakeBuffer: Buffer | undefined;
    let takesBuffers: { title: string; takeBuffer: Buffer }[] = [];

    if (page) {
      const pdfUri = await generatePdf(title, page, song.artistId);

      const pdfContent = await FileSystem.readAsStringAsync(pdfUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      lyricsBuffer = Buffer.from(pdfContent, 'base64');
    }

    if (selectedTakeId && takes) {
      const selectedTake = takes.find(
        (take: Take) => take.takeId === selectedTakeId,
      );
      if (selectedTake) {
        const selectedTakeContent = await FileSystem.readAsStringAsync(
          selectedTake.uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          },
        );
        selectedTakeBuffer = Buffer.from(selectedTakeContent, 'base64');

        takesBuffers = await Promise.all(
          takes
            .filter(({ takeId }: Take) => takeId !== selectedTakeId)
            .map(async ({ title, uri }: Take) => {
              const takeContent = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });
              const takeBuffer = Buffer.from(takeContent, 'base64');

              return { title, takeBuffer };
            }),
        );
      }
    }

    return { title, lyricsBuffer, selectedTakeBuffer, takesBuffers };
  };

  useEffect(() => {
    if (!trigger) return;

    const performBackup = async () => {
      const accessToken = await getValidAccessToken();
      const filesToUpload = [];

      for (const song of songs) {
        await createDropboxFolder(`/${song.title}`);

        const page = pages[song.songId];
        const { title, lyricsBuffer, selectedTakeBuffer, takesBuffers } =
          await generateSongBuffers(song, page);

        if (lyricsBuffer) {
          filesToUpload.push({
            path: `/${title}/Lyrics.pdf`,
            content: lyricsBuffer,
          });
        }

        if (selectedTakeBuffer) {
          filesToUpload.push({
            path: `/${title}/${title}.mp3`,
            content: selectedTakeBuffer,
          });
        }

        if (takesBuffers.length > 0) {
          await createDropboxFolder(`/${song.title}/Takes`);
          for (const take of takesBuffers) {
            filesToUpload.push({
              path: `/${title}/Takes/${take.title}.mp3`,
              content: take.takeBuffer,
            });
          }
        }
      }

      await uploadFilesInBatch(filesToUpload, accessToken);
      setTrigger(false);
    };

    performBackup();
  }, [trigger, songs, pages]);

  const triggerBackup = useCallback(() => {
    setTrigger(true);
  }, []);

  return triggerBackup;
};

export default useDropboxSongFolderGenerator;

// export const uploadFilesInBatch = async (
//   files: { path: string; content: Buffer }[],
//   accessToken: string,
// ) => {
//   const entries = [];

//   console.log('uploading files in batch:', files);

//   for (const file of files) {
//     const sessionId = await startUploadSession(file.content, accessToken);
//     const EIGHT_MB_CHUNK = 8 * 1024 * 1024;
//     let offset = 0;

//     while (offset < file.content.length) {
//       const chunk = file.content.subarray(offset, offset + EIGHT_MB_CHUNK);
//       const isLastChunk = offset + EIGHT_MB_CHUNK >= file.content.length;
//       await appendToUploadSession(
//         sessionId,
//         chunk,
//         accessToken,
//         offset,
//         isLastChunk,
//       );
//       offset += EIGHT_MB_CHUNK;
//     }

//     entries.push({
//       cursor: { session_id: sessionId, offset: file.content.length },
//       commit: {
//         path: `${file.path}`,
//         mode: 'add',
//         autorename: true,
//         mute: false,
//       },
//     });
//   }

//   const result = await finishUploadSessionBatch(entries, accessToken);
//   if (result['.tag'] === 'async_job_id') {
//     await checkUploadSessionBatchStatus(result.async_job_id, accessToken);
//   }
// };
