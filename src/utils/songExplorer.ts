import { Filter, SortBy } from '@src/components/common/enums';
import { Song, Songs, Take } from '@src/components/common/types';

const filterSongs = (songs: Songs, activeFilters: Filter[]) =>
  songs.filter((song: Song) => {
    for (const filter of activeFilters) {
      switch (filter) {
        case Filter.LYRICS:
          if (!song.page?.lyrics.trim()) {
            return false;
          }
          break;
        case Filter.COMPLETED:
          if (!song.page?.info.completed) {
            return false;
          }
          break;
        case Filter.IN_PROGRESS:
          if (song.page?.info.completed) {
            return false;
          }
          break;
      }
    }
    return true;
  });

const searchSongs = (songs: Songs, searchText: string): Songs => {
  if (!searchText) {
    return songs;
  }
  return songs.filter((song: Song) =>
    song.title.toLowerCase().includes(searchText.toLowerCase()),
  );
};

const sortSongs = (
  songs: Songs,
  sortedCategory: SortBy,
  isSortAscending: boolean,
): Songs => {
  return [...songs].sort((a: Song, b: Song) => {
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
};

export const processSongs = (
  songs: Songs,
  sortedCategory: SortBy,
  isSortAscending: boolean,
  activeFilters: Filter[],
  searchText: string,
): Songs => {
  let processedSongs = filterSongs(songs, activeFilters);

  console.log('processedSongs:', processedSongs);

  processedSongs = searchSongs(processedSongs, searchText);

  processedSongs = sortSongs(processedSongs, sortedCategory, isSortAscending);

  return processedSongs;
};
