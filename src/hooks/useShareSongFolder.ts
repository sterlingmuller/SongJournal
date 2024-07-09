import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { zip } from 'react-native-zip-archive';
import { song, take } from '@src/common/types';

function useShareSongFolder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareSongFolder = useCallback(async (song: song) => {
    setIsLoading(true);
    setError(null);

    try {
      // await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      const folderName = song.title;
      const tempDir = FileSystem.cacheDirectory + folderName;
      const zipDir = `${FileSystem.cacheDirectory}/${folderName}.zip`;
      console.log('temp dir:', tempDir);
      // await FileSystem.makeDirectoryAsync(tempDir);

      const starredTake = song.takes.find(
        (take: take) => take.takeId === song.selectedTakeId,
      );

      if (starredTake) {
        await FileSystem.copyAsync({
          from: starredTake.uri,
          to: `${tempDir}/${starredTake.title}.m4a`, // Customize file name/extension
        });
      }

      // if (song.page.lyrics) {
      //   await FileSystem.writeAsStringAsync(
      //     `${tempDir}/lyrics.txt`,
      //     song.page.lyrics,
      //   );
      // }

      console.log('hi');
      const contents = await FileSystem.readDirectoryAsync(
        `${FileSystem.cacheDirectory}/La`,
      ); // Get the list of files and directories

      console.log('Cache directory contents:', contents);

      const zipUri = await zip(tempDir, zipDir);

      console.log('hi ty');

      await Sharing.shareAsync(zipUri, {
        mimeType: 'application/zip',
        dialogTitle: `Share ${folderName}`,
        UTI: 'public.zip-archive',
      });
      // Sharing.shareAsync(tempDir);
    } catch (err) {
      setError((err as Error).message); // Or handle error differently
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { shareSongFolder, isLoading, error };
}

export default useShareSongFolder;
