import { useMemo } from 'react';
import { Songs } from '@src/components/common/types';
import { SortBy, Filter } from '@src/components/common/enums';
import { useNumberedSongs } from '@src/utils/hooks/useNumberedSongs';
import { filterSongs, searchSongs, sortSongs } from '@src/utils/songExplorer';

export const useProcessSongs = (
  songs: Songs,
  sortedCategory: SortBy,
  isSortAscending: boolean,
  activeFilters: Filter[],
  searchText: string,
) => {
  const numberSongs = useNumberedSongs();

  return useMemo(() => {
    let processedSongs = numberSongs(songs);

    if (activeFilters.length) {
      processedSongs = filterSongs(processedSongs, activeFilters);
    }
    if (searchText) {
      processedSongs = searchSongs(processedSongs, searchText);
    }
    processedSongs = sortSongs(processedSongs, sortedCategory, isSortAscending);

    return processedSongs;
  }, [songs, sortedCategory, isSortAscending, activeFilters, searchText]);
};
