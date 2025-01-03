import React from 'react';

import SongFolders from '@src/components/home/components/SongFolders';
import { DeleteObject } from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectSongs } from '@src/state/selectors/songsSelector';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { Filter, Screen, SortBy } from '@src/components/common/enums';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { title: string; songId: number }) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  activeFilters: Filter[];
  searchText: string;
}

const HomeDisplay = (props: Props) => {
  const {
    setToDelete,
    setTitleToEdit,
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
        setTitleToEdit={setTitleToEdit}
      />
    );
  }

  return <ComposerMessage screen={Screen.HOME} />;
};

export default HomeDisplay;
