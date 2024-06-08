import { song, sortByCategoryName, take } from '@src/common/types';

// Improve this to filter songs by completion status and lyrics status

export const sortSongs = (
  songs: song[],
  sortedCategory: sortByCategoryName,
  isSortAscending: boolean = true,
): song[] => {
  const sortedSongs = [...songs];

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
      case 'Length': {
        const durationA =
          a.takes.find((take: take) => take.takeId === a.selectedTakeId)
            ?.duration || 0;
        const durationB =
          b.takes.find((take: take) => take.takeId === b.selectedTakeId)
            ?.duration || 0;
        return isSortAscending ? durationA - durationB : durationB - durationA;
      }
      case 'Lyrics':
        return isSortAscending
          ? (a.page?.lyrics.length || 0) - (b.page?.lyrics.length || 0)
          : (b.page?.lyrics.length || 0) - (a.page?.lyrics.length || 0);
      default:
        return 0;
    }
  });

  return sortedSongs;
};
