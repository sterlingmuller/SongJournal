import { Songs, Song } from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectIsNumbered } from '@src/state/selectors/settingsSelector';
import { SortBy } from '@src/components/common/enums';

export const useNumberedSongs = () => {
  const isNumbered = useAppSelector(selectIsNumbered);

  const numberSongs = (songs: Songs, sortedCategory: SortBy) => {
    if (isNumbered) {
      let newNumberedSongs: Songs;

      if (sortedCategory === SortBy.DATE) {
        const totalSongs = songs.length;

        newNumberedSongs = songs.map((song: Song, index: number) => ({
          ...song,
          title: `${totalSongs - index}. ${song.title}`,
        }));
      } else {
        newNumberedSongs = songs.map((song: Song, index: number) => ({
          ...song,
          title: `${index + 1}. ${song.title}`,
        }));
      }
      return newNumberedSongs;
    } else {
      return songs;
    }
  };

  return numberSongs;
};
