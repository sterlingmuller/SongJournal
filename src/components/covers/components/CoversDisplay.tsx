import React from 'react';

import SongFolders from '@src/components/home/components/SongFolders';
import { DeleteObject } from '@src/components/common/types';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCoverSongs } from '@src/state/selectors/songsSelector';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { Filter, MessageIntent, SortBy } from '@src/components/common/enums';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { songTitle: string; songId: number }) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  activeFilters: Filter[];
  searchText: string;
}

const CoversDisplay = (props: Props) => {
  const {
    setToDelete,
    setTitleToEdit,
    sortedCategory,
    isSortAscending,
    activeFilters,
    searchText,
  } = props;
  const songs = useAppSelector(selectCoverSongs);

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

  return <ComposerMessage messageIntent={MessageIntent.GET_STARTED_HOME} />;
};

export default CoversDisplay;
