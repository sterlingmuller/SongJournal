import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { useSQLiteContext } from 'expo-sqlite';

import { uploadFilesInBatch } from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import { Page, Song, SongToPageMap, Take } from '@src/components/common/types';
import { fetchPages } from '@src/data/repositories/PageRepository';
import { useArtistName } from '@src/utils/hooks/useArtistName';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { selectSyncFilters } from '@src/state/selectors/settingsSelector';
import useAddToUploadQueue from '@src/services/cloudStorage/useAddToUploadQueue';
import { useNetworkStatus } from '@src/state/context/NetworkContext';
import { createDropboxFolder } from '@src/services/cloudStorage/dropbox/helpers/createDropBoxFolder';
import { generateBuffer } from '@dropbox/helpers/generateBuffer';

const useOneTimeSync = () => {
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

  const generateSongBuffers = async (song: Song, page: Page) => {
    const { title, selectedTakeId, takes } = song;

    let lyricsBuffer: Buffer | undefined;
    let selectedTakeBuffer: Buffer<ArrayBufferLike> | undefined;
    let takesBuffers: { title: string; takeBuffer: Buffer<ArrayBufferLike> }[] =
      [];

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
          for (const song of songs) {
            await createDropboxFolder(song.title);
          }

          await uploadFilesInBatch(filesToUpload);
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

export default useOneTimeSync;
