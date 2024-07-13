import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { song, take } from '@src/common/types';
// import { convertToSnakeCase } from '@src/utils/convertToSnakeCase';

function useShareSongFolder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareSongFolder = useCallback(async (song: song) => {
    setIsLoading(true);
    setError(null);

    try {
      const fileUri = `${FileSystem.cacheDirectory}${song.title}`;

      const starredTake = song.takes.find(
        (take: take) => take.takeId === song.selectedTakeId,
      );

      if (starredTake) {
        await FileSystem.copyAsync({
          from: starredTake.uri,
          to: `${fileUri}/${starredTake.title}.m4a`,
        });
      }

      if (song.page.lyrics) {
        await FileSystem.writeAsStringAsync(
          `${fileUri}/lyrics.txt`,
          song.page.lyrics,
        );
      }

      const zipUri = await zip(
        fileUri,
        `${FileSystem.cacheDirectory}${song.title}.zip`,
      );

      await Sharing.shareAsync(`file://${zipUri}`, {
        mimeType: 'application/zip',
      });

      FileSystem.deleteAsync(fileUri, { idempotent: true });
      FileSystem.deleteAsync(
        `${FileSystem.cacheDirectory}${starredTake.title}.zip`,
        { idempotent: true },
      );
    } catch (err) {
      setError((err as Error).message); // Or handle error differently
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const shareTake = useCallback(
  //   async (takeUri: string, takeTitle: string, title: string) => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const formattedTakeTitle = convertToSnakeCase(takeTitle);
  //       const formattedTitle = convertToSnakeCase(title);
  //       const fileUri = `${FileSystem.cacheDirectory}${formattedTitle}-${formattedTakeTitle}.m4a`;

  //       await FileSystem.copyAsync({
  //         from: takeUri,
  //         to: fileUri,
  //       });

  //       await Sharing.shareAsync(fileUri);

  //       FileSystem.deleteAsync(fileUri, { idempotent: true });
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [],
  // );

  return { shareSongFolder, isLoading, error };
}

export default useShareSongFolder;
