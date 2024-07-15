import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { page, song, take } from '@src/common/types';
import { convertToSnakeCase } from '@src/utils/convertToSnakeCase';
import { useSQLiteContext } from 'expo-sqlite';
import { fetchPageBySongId } from '@src/repositories/PageRepository';
import { generatePagePdf } from '@src/utils/generatePagePdf';

// add Error handling on screen - have an error modal

function useFileShare() {
  const [error, setError] = useState<string | null>(null);
  const db = useSQLiteContext();

  const shareSongFolder = useCallback(async (song: song) => {
    setError(null);

    try {
      const formattedTitle = convertToSnakeCase(song.title);

      // Clean this up, shouldn't fetch if already exists
      const page = await fetchPageBySongId({ songId: song.songId, db });

      const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}`;
      const starredTake = song.takes.find(
        (take: take) => take.takeId === song.selectedTakeId,
      );

      if (starredTake) {
        console.log('starredTake uri:', starredTake.uri);
        await FileSystem.copyAsync({
          from: starredTake.uri,
          to: `${fileUri}/${formattedTitle}.m4a`,
        });
      }

      if (page.lyrics) {
        const pdfUri = await generatePagePdf(formattedTitle, page);

        await FileSystem.copyAsync({
          from: pdfUri,
          to: `${fileUri}/${formattedTitle}.pdf`,
        });
      }

      const zipUri = await zip(
        fileUri,
        `${FileSystem.cacheDirectory}${formattedTitle}.zip`,
      );
      await Sharing.shareAsync(`file://${zipUri}`, {
        mimeType: 'application/zip',
      });

      FileSystem.deleteAsync(fileUri, { idempotent: true });
      FileSystem.deleteAsync(
        `${FileSystem.cacheDirectory}${formattedTitle}.zip`,
        { idempotent: true },
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const shareTake = useCallback(
    async (takeUri: string, takeTitle: string, title: string) => {
      try {
        const formattedTakeTitle = convertToSnakeCase(takeTitle);
        const formattedTitle = convertToSnakeCase(title);
        const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}-${formattedTakeTitle}.m4a`;

        await FileSystem.copyAsync({
          from: takeUri,
          to: fileUri,
        });

        await Sharing.shareAsync(fileUri);

        FileSystem.deleteAsync(fileUri, { idempotent: true });
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [],
  );

  const shareLyrics = useCallback(async (title: string, page: page) => {
    try {
      const formattedTitle = convertToSnakeCase(title);
      const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}.pdf`;
      const pdfUri = await generatePagePdf(title, page);

      await FileSystem.copyAsync({
        from: pdfUri,
        to: fileUri,
      });
      await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf' });

      FileSystem.deleteAsync(fileUri, { idempotent: true });
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  return { shareSongFolder, shareTake, shareLyrics, error };
}

export default useFileShare;
