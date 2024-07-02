import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { song } from '@src/common/types';

function useShareSongFolder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareSongFolder = useCallback(async (song: song, lyrics: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const folderName = song.title;
      const tempDir = FileSystem.cacheDirectory + folderName;
      await FileSystem.makeDirectoryAsync(tempDir);

      const starredTake = song.takes.find(
        (take) => take.takeId === song.selectedTakeId,
      );
      if (starredTake) {
        await FileSystem.copyAsync({
          from: starredTake.uri,
          to: `${tempDir}/${starredTake.title}.m4a`, // Customize file name/extension
        });
      }

      await FileSystem.writeAsStringAsync(`${tempDir}/lyrics.txt`, lyrics);

      // const zipUri = await zipDirectoryAsync(tempDir, {
      //   name: `${folderName}.zip`,
      // });

      await Sharing.shareAsync(zipUri, {
        mimeType: 'application/zip',
        dialogTitle: `Share ${folderName}`,
        UTI: 'public.zip-archive',
      });
    } catch (err) {
      setError((err as Error).message); // Or handle error differently
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { shareSongFolder, isLoading, error };
}

export default useShareSongFolder;
