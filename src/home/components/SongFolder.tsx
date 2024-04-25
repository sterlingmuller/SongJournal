import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import SongFolderContent from '../subcomponents/SongFolderContent';
import DeleteRow from '../subcomponents/DeleteRow';
import { DUMMY_SONGS } from '@src/common/constants';

interface Props {
  setIsDeleteModalOpen: (value: string) => void;
}

const SongFolder = ({ setIsDeleteModalOpen }: Props) => {
  return (
    <SwipeListView
      contentContainerStyle={{ paddingBottom: 200 }}
      data={DUMMY_SONGS}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      renderItem={(data) => <SongFolderContent song={data.item.text} />}
      renderHiddenItem={(data) => (
        <DeleteRow
          song={data.item.text}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      rightOpenValue={-100}
    />
  );
};

export default SongFolder;
