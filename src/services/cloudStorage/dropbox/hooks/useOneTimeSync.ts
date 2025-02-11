import { useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

import { uploadFilesInBatch } from '@src/services/cloudStorage/dropbox/helpers/dropboxFileRequests';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import { Page, Take } from '@src/components/common/types';
import { fetchPages } from '@src/data/repositories/PageRepository';
import { useArtistName } from '@src/utils/hooks/useArtistName';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { selectSyncFilters } from '@src/state/selectors/settingsSelector';
import useAddToUploadQueue from '@src/services/cloudStorage/useAddToUploadQueue';
import { useNetworkStatus } from '@src/state/context/NetworkContext';

const useOneTimeSync = () => {
  const db = useSQLiteContext();
  const songs = useAppSelector(selectSongs);
  const { isUnstarredTakeConditionEnabled, isCompletedSongConditionEnabled } =
    useAppSelector(selectSyncFilters);
  const { isOnline } = useNetworkStatus();
  const { addToUploadQueue } = useAddToUploadQueue();
  const { getArtistName } = useArtistName();

  const generatePdf = async (title: string, page: Page, artistId: number) => {
    const artist = getArtistName(artistId);
    const pdfUri = await generatePagePdf(title, page, artist);

    return pdfUri;
  };

  const generateFilesToUpload = async () => {
    const filesToUpload = [];
    const pages = await fetchPages(db);

    for (const song of songs) {
      const { songId, completed, title, selectedTakeId, artistId, takes } =
        song;
      const page = pages[songId];

      if (
        (isCompletedSongConditionEnabled && !completed) ||
        (!pages[songId] && selectedTakeId === -1)
      ) {
        continue;
      }

      if (page) {
        const pdfUri = await generatePdf(title, page, artistId);

        filesToUpload.push({
          path: `/${title}/Lyrics.pdf`,
          uri: pdfUri,
          songTitle: title,
        });
      }

      if (selectedTakeId > -1 && takes) {
        const selectedTake = takes.find(
          (take: Take) => take.takeId === selectedTakeId,
        );

        filesToUpload.push({
          path: `/${title}/${title}.m4a`,
          uri: selectedTake.uri,
          songTitle: title,
        });

        if (isUnstarredTakeConditionEnabled) {
          for (const take of takes) {
            if (take.takeId !== selectedTakeId) {
              filesToUpload.push({
                path: `/${title}/Takes/${take.title}.m4a`,
                uri: take.uri,
                songTitle: title,
              });
            }
          }
        }
      }
    }

    return filesToUpload;
  };

  const performBackup = useCallback(async () => {
    const filesToUpload = await generateFilesToUpload();

    if (filesToUpload.length > 0) {
      if (isOnline) {
        await uploadFilesInBatch(filesToUpload);
      } else {
        addToUploadQueue(filesToUpload);
      }
    }
  }, [
    songs,
    isCompletedSongConditionEnabled,
    isUnstarredTakeConditionEnabled,
    isOnline,
    addToUploadQueue,
  ]);

  return performBackup;
};

export default useOneTimeSync;
