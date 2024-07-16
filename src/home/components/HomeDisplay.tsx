import React from 'react';

import SongFolders from '@src/home/components/SongFolders';
import {
  FilterOptions,
  deleteObject,
  sortByCategoryName,
} from '@src/common/types';
import { useAppSelector } from '@src/common/hooks';
import { selectSongs } from '@src/selectors/songsSelector';
import GetStarted from '@src/common/components/GetStarted';

interface Props {
  setToDelete: (value: deleteObject | null) => void;
  sortedCategory: sortByCategoryName;
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

  return <GetStarted screen={'home'} />;
};

export default HomeDisplay;
