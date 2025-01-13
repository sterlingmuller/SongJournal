import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import { backupSong } from '@src/data/utils/uploadToDropbox';
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

  const generateAndBackupSong = async (song: Song, page: Page) => {
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

    if (lyricsBuffer || selectedTakeBuffer || takesBuffers.length > 0) {
      await backupSong(title, lyricsBuffer, selectedTakeBuffer, takesBuffers);
    }
  };

  const triggerBackup = useCallback(() => {
    songs.forEach((song: Song) => {
      const page = pages[song.songId];
      generateAndBackupSong(song, page);
    });
  }, [songs, pages]);

  return triggerBackup;
};

export default useDropboxSongFolderGenerator;
