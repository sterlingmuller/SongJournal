import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import { zip } from 'react-native-zip-archive';
import { useSQLiteContext } from 'expo-sqlite';

import { Page, Song, Take } from '@src/components/common/types';
import { convertToSnakeCase } from '@src/utils/convertToSnakeCase';
import { fetchPageBySongId } from '@src/data/repositories/PageRepository';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { useArtistName } from './useArtistName';
import { shareZip, shareAudio, sharePdf } from '@src/utils/shareHelpers';

// add Error handling on screen - have an error modal

const useFileShare = () => {
  const [error, setError] = useState<string | null>(null);
  const db = useSQLiteContext();
  const { getArtistName } = useArtistName();

  const getPdfUri = async (title: string, page: Page, artistId: number) => {
    const artist = getArtistName(artistId);
    const pdfUri = await generatePagePdf(title, page, artist);

    return pdfUri;
  };

  const shareSongFolder = useCallback(async (song: Song) => {
    setError(null);

    try {
      const formattedTitle = convertToSnakeCase(song.title);

      // Clean this up, shouldn't fetch if already exists
      const page = await fetchPageBySongId({ songId: song.songId, db });

      const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}`;
      const starredTake = song.takes.find(
        (take: Take) => take.takeId === song.selectedTakeId,
      );

      if (starredTake) {
        await FileSystem.copyAsync({
          from: starredTake.uri,
          to: `${fileUri}/${formattedTitle}.m4a`,
        });
      }

      if (page.lyrics) {
        const pdfUri = await getPdfUri(song.title, page, song.artistId);

        await FileSystem.copyAsync({
          from: pdfUri,
          to: `${fileUri}/${formattedTitle}.pdf`,
        });
      }

      const zipUri = await zip(
        fileUri,
        `${FileSystem.cacheDirectory}${formattedTitle}.zip`,
      );

      await shareZip(zipUri, formattedTitle, song.title);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const shareTake = useCallback(
    async (takeUri: string, takeTitle: string, title: string, date: string) => {
      try {
        const formattedTakeTitle = convertToSnakeCase(takeTitle);
        const formattedTitle = convertToSnakeCase(title);
        const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}-${formattedTakeTitle}.m4a`;

        await FileSystem.copyAsync({
          from: takeUri,
          to: fileUri,
        });

        await shareAudio(
          fileUri,
          `${formattedTitle} - ${formattedTakeTitle}`,
          date,
        );
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [],
  );

  const shareLyrics = useCallback(
    async (title: string, page: Page, artistId: number) => {
      try {
        // const formattedTitle = convertToSnakeCase(title);
        const fileUri = `${FileSystem.cacheDirectory}${title} Lyrics.pdf`;
        const pdfUri = await getPdfUri(title, page, artistId);

        await FileSystem.copyAsync({
          from: pdfUri,
          to: fileUri,
        });

        await sharePdf(fileUri, `${title} Lyrics`);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [],
  );

  return { shareSongFolder, shareTake, shareLyrics, error };
};

export default useFileShare;
