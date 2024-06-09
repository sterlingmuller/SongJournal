import {
  FilterOptions,
  song,
  sortByCategoryName,
  take,
} from '@src/common/types';

const filterSongs = (songs: song[], filterOptions: FilterOptions) =>
  songs.filter((song: song) => {
    for (const filterKey in filterOptions) {
      const filterValue = filterOptions[filterKey];

      if (filterValue !== undefined) {
        switch (filterKey) {
          case 'Lyrics':
            if (filterValue === true && !song.page?.lyrics.trim()) {
              return false;
            } else if (filterValue === false && song.page?.lyrics.trim()) {
              return false;
            }
            break;
          case 'Completed':
            if (filterValue === true && !song.page?.completed) {
              return false;
            } else if (filterValue === false && song.page?.completed) {
              return false;
            }
            break;
        }
      }
    }
    return true;
  });

export const sortSongs = (
  songs: song[],
  sortedCategory: sortByCategoryName,
  isSortAscending: boolean = true,
  filterOptions: FilterOptions,
): song[] => {
  const filteredSongs = filterSongs(songs, filterOptions);
  const sortedSongs = [...filteredSongs];

  sortedSongs.sort((a: song, b: song) => {
    switch (sortedCategory) {
      case 'Date': {
        const dateA =
          a.takes.find((take: take) => take.takeId === a.selectedTakeId)
            ?.date || '';
        const dateB =
          b.takes.find((take: take) => take.takeId === b.selectedTakeId)
            ?.date || '';
        return isSortAscending
          ? new Date(dateA).getTime() - new Date(dateB).getTime()
          : new Date(dateB).getTime() - new Date(dateA).getTime();
      }
      case 'Name':
        return isSortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      case 'Length':
        {
          const durationA =
            a.takes.find((take: take) => take.takeId === a.selectedTakeId)
              ?.duration || 0;
          const durationB =
            b.takes.find((take: take) => take.takeId === b.selectedTakeId)
              ?.duration || 0;
          return isSortAscending
            ? durationA - durationB
            : durationB - durationA;
        }
        return isSortAscending
          ? (a.page?.lyrics.length || 0) - (b.page?.lyrics.length || 0)
          : (b.page?.lyrics.length || 0) - (a.page?.lyrics.length || 0);
      default:
        return 0;
    }
  });

  return sortedSongs;
};
