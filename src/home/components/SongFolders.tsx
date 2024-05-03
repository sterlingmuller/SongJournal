import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/home/subcomponents/SongFolder';
import DeleteRow from '@src/home/subcomponents/DeleteRow';
import { DUMMY_SONGS } from '@src/common/constants';
import { ListRenderItemInfo } from 'react-native';
import { song } from '@src/common/types';

interface Props {
  setIsDeleteModalOpen: (value: boolean) => void;
}

const SongFolders = ({ setIsDeleteModalOpen }: Props) => (
  <SwipeListView
    contentContainerStyle={{ paddingBottom: 200 }}
    data={DUMMY_SONGS}
    disableRightSwipe
    previewRowKey={'0'}
    previewOpenValue={-40}
    previewOpenDelay={3000}
    renderItem={(data: ListRenderItemInfo<song>) => {
      return <SongFolder song={data.item} />;
    }}
    renderHiddenItem={(data: ListRenderItemInfo<song>) => (
      <DeleteRow
        song={data.item.title}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    )}
    rightOpenValue={-100}
  />
);

export default SongFolders;
