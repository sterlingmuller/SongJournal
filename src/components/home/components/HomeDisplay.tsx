import React from 'react';

import SongFolders from '@src/components/home/components/SongFolders';
import { FilterOptions, DeleteObject } from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import GetStarted from '@src/components/common/components/GetStarted';
import { Screen, SortBy } from '@src/components/common/enums';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  filterOptions: FilterOptions;
  searchText: string;
}

const HomeDisplay = (props: Props) => {
  const {
    setToDelete,
    sortedCategory,
    isSortAscending,
    filterOptions,
    searchText,
  } = props;
  const songs = useAppSelector(selectSongs);

  if (songs.length > 0) {
    return (
      <SongFolders
        setToDelete={setToDelete}
        sortedCategory={sortedCategory}
        isSortAscending={isSortAscending}
        filterOptions={filterOptions}
        songs={songs}
        searchText={searchText}
      />
    );
  }

  return <GetStarted screen={Screen.HOME} />;
};

export default HomeDisplay;
