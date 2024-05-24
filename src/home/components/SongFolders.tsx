import React, { useEffect } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/home/subcomponents/SongFolder';
import DeleteRow from '@src/home/subcomponents/DeleteRow';
import { ListRenderItemInfo } from 'react-native';
import { deleteObject, songInfo } from '@src/common/types';
import { useSQLiteContext } from 'expo-sqlite';
import { getAllSongs } from '@src/repositories/SongsRepository';
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { setSongs } from '@src/slice/songsSlice';
import { selectSongs } from '@src/selectors/songsSelector';

interface Props {
  setToDelete: (value: deleteObject | null) => void;
}

const SongFolders = ({ setToDelete }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const songs = useAppSelector(selectSongs);

  useEffect(() => {
    const results: songInfo[] = getAllSongs(db);

    dispatch(setSongs(results));
  }, []);

  return (
    <SwipeListView
      contentContainerStyle={{ paddingBottom: 200 }}
      data={songs}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      renderItem={(data: ListRenderItemInfo<songInfo>) => {
        return <SongFolder songInfo={data.item} />;
      }}
      renderHiddenItem={(data: ListRenderItemInfo<songInfo>) => (
        <DeleteRow
          title={data.item.title}
          id={data.item.songId}
          setToDelete={setToDelete}
        />
      )}
      rightOpenValue={-100}
    />
  );
};

export default SongFolders;
