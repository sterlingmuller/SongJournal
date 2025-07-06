import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CreateNewSongButton from '@src/components/home/components/CreateNewSongButton';
import NewSongModal from '@src/components/home/components/NewSongModal';
import { DeleteObject } from '@src/components/common/types';
import DeleteModal from '@src/components/common/components/DeleteModal';
import {
  DELETE_SONG_TEXT,
  EMPTY_DELETE_OBJECT,
} from '@src/components/common/constants';
import useGlobalStyles from '@styles/global';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { selectPlaybackUri } from '@src/state/selectors/playbackSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import CoversDisplay from '@src/components/covers/components/CoversDisplay';
import EditTitleModal from '@src/components/common/components/EditTitleModal';

const CoversScreen = () => {
  const { addListener } = useNavigation();
  const styles = useGlobalStyles();
  const { clearPlayback } = useAudioPlayer();
  const playbackUri = useAppSelector(selectPlaybackUri);

  const [isNewSongOpen, setIsNewSongOpen] = useState<boolean>(false);
  const [titleToEdit, setTitleToEdit] = useState<{
    songTitle: string;
    songId: number;
  }>({ songTitle: '', songId: -1 });
  const [toDelete, setToDelete] = useState<DeleteObject>(EMPTY_DELETE_OBJECT);
  const [expandedArtistId, setExpandedArtistId] = useState<number>(-1);

  useEffect(() => {
    const unsubscribe = addListener('blur', () => {
      if (playbackUri) {
        clearPlayback();
      }
      setExpandedArtistId(-1);
    });

    return unsubscribe;
  }, [addListener, playbackUri]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CoversDisplay
          setToDelete={setToDelete}
          setTitleToEdit={setTitleToEdit}
          expandedArtistId={expandedArtistId}
          setExpandedArtistId={setExpandedArtistId}
        />
        <CreateNewSongButton setIsNewSongOpen={setIsNewSongOpen} />
        <NewSongModal
          isNewSongOpen={isNewSongOpen}
          setIsNewSongOpen={setIsNewSongOpen}
        />
        <EditTitleModal
          titleToEdit={titleToEdit}
          setTitleToEdit={setTitleToEdit}
        />
        <DeleteModal
          deleteText={DELETE_SONG_TEXT}
          toDelete={toDelete}
          setToDelete={setToDelete}
        />
      </View>
    </View>
  );
};

export default CoversScreen;