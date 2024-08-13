import { SortBy } from '@src/common/enums';
import { FilterOptions, Song, Songs, Take } from '@src/common/types';

const filterSongs = (songs: Songs, filterOptions: FilterOptions) =>
  songs.filter((song: Song) => {
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
            if (filterValue === true && !song.page?.info.completed) {
              return false;
            } else if (filterValue === false && song.page?.info.completed) {
              return false;
            }
            break;
        }
      }
    }
    return true;
  });

export const sortSongs = (
  songs: Songs,
  sortedCategory: SortBy,
  isSortAscending: boolean = true,
  filterOptions: FilterOptions,
): Songs => {
  const filteredSongs = filterSongs(songs, filterOptions);
  const sortedSongs = [...filteredSongs];

  sortedSongs.sort((a: Song, b: Song) => {
    switch (sortedCategory) {
      case SortBy.DATE: {
        const dateA =
          a.takes.find((take: Take) => take.takeId === a.selectedTakeId)
            ?.date || '';
        const dateB =
          b.takes.find((take: Take) => take.takeId === b.selectedTakeId)
            ?.date || '';
        return isSortAscending
          ? new Date(dateA).getTime() - new Date(dateB).getTime()
          : new Date(dateB).getTime() - new Date(dateA).getTime();
      }
      case SortBy.NAME:
        return isSortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      case SortBy.LENGTH: {
        const durationA =
          a.takes.find((take: Take) => take.takeId === a.selectedTakeId)
            ?.duration || 0;
        const durationB =
          b.takes.find((take: Take) => take.takeId === b.selectedTakeId)
            ?.duration || 0;
        return isSortAscending ? durationA - durationB : durationB - durationA;
      }

      default:
        return 0;
    }
  });

  return sortedSongs;
};
