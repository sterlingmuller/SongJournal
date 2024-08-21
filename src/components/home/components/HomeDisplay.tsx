import React from 'react';

import SongFolders from '@src/components/home/components/SongFolders';
import { DeleteObject } from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import GetStarted from '@src/components/common/components/GetStarted';
import { Filter, Screen, SortBy } from '@src/components/common/enums';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  activeFilters: Filter[];
  searchText: string;
}

const HomeDisplay = (props: Props) => {
  const {
    setToDelete,
    sortedCategory,
    isSortAscending,
    activeFilters,
    searchText,
  } = props;
  const songs = useAppSelector(selectSongs);

  if (songs.length > 0) {
    return (
      <SongFolders
        setToDelete={setToDelete}
        sortedCategory={sortedCategory}
        isSortAscending={isSortAscending}
        activeFilters={activeFilters}
        songs={songs}
        searchText={searchText}
      />
    );
  }

  return <GetStarted screen={Screen.HOME} />;
};

export default HomeDisplay;
