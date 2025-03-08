import { Songs, Song } from '@src/components/common/types';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsNumbered } from '@src/state/selectors/settingsSelector';

export const useNumberedSongs = () => {
  const isNumbered = useAppSelector(selectIsNumbered);

  const numberSongs = (songs: Songs) => {
    if (isNumbered) {
      const indexMap = new Map(
        [...songs]
          .sort((a: Song, b: Song) => a.songId - b.songId)
          .map((song: Song, index: number) => [song.songId, index + 1]),
      );

      return songs.map((song: Song) => ({
        ...song,
        orderNumber: indexMap.get(song.songId),
      }));
    }
    return songs;
  };

  return numberSongs;
};
