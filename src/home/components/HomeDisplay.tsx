import React from 'react';

import SongFolders from '@src/home/components/SongFolders';
import { FilterOptions, DeleteObject } from '@src/common/types';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectSongs } from '@src/selectors/songsSelector';
import GetStarted from '@src/common/components/GetStarted';
import { Screen, SortBy } from '@src/common/enums';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  filterOptions: FilterOptions;
}

const HomeDisplay = (props: Props) => {
  const { setToDelete, sortedCategory, isSortAscending, filterOptions } = props;
  const songs = useAppSelector(selectSongs);

  if (songs.length > 0) {
    return (
      <SongFolders
        setToDelete={setToDelete}
        sortedCategory={sortedCategory}
        isSortAscending={isSortAscending}
        filterOptions={filterOptions}
        songs={songs}
      />
    );
  }

  return <GetStarted screen={Screen.HOME} />;
};

export default HomeDisplay;
