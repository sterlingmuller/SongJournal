import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import {
  getValidAccessToken,
  uploadFilesInBatch,
} from '@dropbox/helpers/uploadToDropbox';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import { Page, Song, SongToPageMap, Take } from '@src/components/common/types';
import { fetchPages } from '../../../../data/repositories/PageRepository';
import { useSQLiteContext } from 'expo-sqlite';
import { useArtistName } from '@src/utils/hooks/useArtistName';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { selectSyncFilters } from '@src/state/selectors/settingsSelector';
import useAddToUploadQueue from '@src/services/cloudStorage/useAddToUploadQueue';
import { useNetworkStatus } from '@src/state/context/NetworkContext';
import { createDropboxFolder } from '@src/services/cloudStorage/dropbox/helpers/createDropBoxFolder';
import { generateBuffer } from '@dropbox/helpers/generateBuffer';

const useDropboxBatchFileGenerator = () => {
  const db = useSQLiteContext();
  const songs = useAppSelector(selectSongs);
  const { isUnstarredTakeConditionEnabled, isCompletedSongConditionEnabled } =
    useAppSelector(selectSyncFilters);
  const [pages, setPages] = useState<SongToPageMap>({});
  const [trigger, setTrigger] = useState(false);
  const { isOnline } = useNetworkStatus();

  const { addToUploadQueue } = useAddToUploadQueue();

  const { getArtistName } = useArtistName();

  const generatePdf = async (title: string, page: Page, artistId: number) => {
    const artist = getArtistName(artistId);
    const pdfUri = await generatePagePdf(title, page, artist);

    return pdfUri;
  };

  useEffect(() => {
    const fetchPagesData = async () => {
      const fetchedPages = await fetchPages(db);
      setPages(fetchedPages);
    };

    fetchPagesData();
  }, [db]);

  // Maybe add an array of folders to generate and push to the array as we iterate. That way we don't need to iterate twice

  // Might want to break down this logic to a few more hooks / helpers. All Sync related hooks and helpers should be moved to one folder

  const generateSongBuffers = async (song: Song, page: Page) => {
    const { title, selectedTakeId, takes } = song;

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

    if (selectedTakeId > -1 && takes) {
      const selectedTake = takes.find(
        (take: Take) => take.takeId === selectedTakeId,
      );

      selectedTakeBuffer = await generateBuffer(selectedTake.uri);

      if (isUnstarredTakeConditionEnabled) {
        takesBuffers = await Promise.all(
          takes
            .filter(({ takeId }: Take) => takeId !== selectedTakeId)
            .map(async ({ title, uri }: Take) => {
              const takeBuffer = await generateBuffer(uri);

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
      const filesToUpload = [];
      for (const song of songs) {
        if (
          (isCompletedSongConditionEnabled && !song.completed) ||
          (!pages[song.songId] && song.selectedTakeId === -1)
        ) {
          continue;
        }

        // move the dropbox folder creator to a helper function
        // iterate over songs if online, calling this for each song title
        // this helper also needs to be used in the processQueue function so that folders are created before queues are uploaded

        // separate issue to look into, to large of file size for secureStore

        // await createDropboxFolder(`/${song.title}`);

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
            path: `/${title}/${title}.m4a`,
            content: selectedTakeBuffer,
          });
        }

        if (takesBuffers.length > 0) {
          // add some logic to create take folder
          // await createDropboxFolder(`/${song.title}/Takes`);
          for (const take of takesBuffers) {
            filesToUpload.push({
              path: `/${title}/Takes/${take.title}.m4a`,
              content: take.takeBuffer,
            });
          }
        }
      }

      if (filesToUpload.length > 0) {
        if (isOnline) {
          const accessToken = await getValidAccessToken();

          for (const song of songs) {
            await createDropboxFolder(song.title);
          }

          await uploadFilesInBatch(filesToUpload, accessToken);
        } else {
          addToUploadQueue(filesToUpload);
        }
      }

      setTrigger(false);
    };

    performBackup();
  }, [trigger, songs, pages]);

  const triggerBackup = useCallback(() => {
    setTrigger(true);
  }, []);

  return triggerBackup;
};

export default useDropboxBatchFileGenerator;
