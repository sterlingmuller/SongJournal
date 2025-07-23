import { Filter, SortBy } from '@src/components/common/enums';
import { Song, Songs, Take } from '@src/components/common/types';

export const filterSongs = (songs: Songs, activeFilters: Filter[]) =>
  songs.filter((song: Song) => {
    for (const filter of activeFilters) {
      switch (filter) {
        case Filter.LYRICS:
          if (!song.hasLyrics) {
            return false;
          }
          break;
        case Filter.COMPLETED:
          if (!song.completed) {
            return false;
          }
          break;
        case Filter.IN_PROGRESS:
          if (song.completed) {
            return false;
          }
          break;
      }
    }
    return true;
  });

export const searchSongs = (songs: Songs, searchText: string): Songs =>
  songs.filter((song: Song) =>
    song.title.toLowerCase().includes(searchText.toLowerCase())
  );

export const sortSongs = (
  songs: Songs,
  sortedCategory: SortBy,
  isSortAscending: boolean
): Songs =>
  [...songs].sort((a: Song, b: Song) => {
    switch (sortedCategory) {
      case SortBy.DATE: {
        return isSortAscending
          ? new Date(a.creationDate).getTime() -
              new Date(b.creationDate).getTime()
          : new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime();
      }
      case SortBy.LAST_UPDATED: {
        const dateA =
          a.takes.length > 0
            ? new Date(a.takes[a.takes.length - 1].date).getTime()
            : 0;
        const dateB =
          b.takes.length > 0
            ? new Date(b.takes[b.takes.length - 1].date).getTime()
            : 0;
        return isSortAscending ? dateA - dateB : dateB - dateA;
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
