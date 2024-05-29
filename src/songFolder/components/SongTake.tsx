import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { take } from '@src/common/types';
import StarIcon from '@src/icons/StarIcon';
import useDoubleTap from '@src/hooks/useDoubleTap';
import useSongTakeStyles from '@styles/songTake';
import { useAppDispatch } from '@src/common/hooks';
import { updateSelectedTakeIdRequest } from '@src/sagas/actionCreators';
import { playRecording } from '@src/utils/startStopPlayRecording';
import PauseIcon from '@src/icons/PauseIcon';
import { togglePausePlayAndReturnIsPlaying } from '@src/utils/togglePausePlay';

interface Props {
  take: take;
  starred: boolean;
  isPlaying: boolean;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsNotesModalOpen: (value: boolean) => void;
  onTogglePlayPause: (value: number) => void;
}

const SongTake = (props: Props) => {
  const {
    take,
    starred,
    isPlaying,
    setIsDeleteModalOpen,
    setIsNotesModalOpen,
    onTogglePlayPause,
  } = props;
  const { takeId, songId } = take;
  const styles = useSongTakeStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();

  const onDoubleTap: () => void = useDoubleTap(() =>
    dispatch(updateSelectedTakeIdRequest({ takeId, songId, db })),
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onDoubleTap}>
      <View style={styles.contents}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{take.title}</Text>
          {starred && <StarIcon />}
        </View>
        <Text>{take.date}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => {
              setIsNotesModalOpen(true);
            }}
          >
            <NotesIcon />
          </TouchableOpacity>
          <ShareIcon />
          <TouchableOpacity
            onPress={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            <TrashIcon />
          </TouchableOpacity>
          <View style={styles.playbackBar} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.playIcon}
        onPress={onTogglePlayPause(take.uri)}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongTake;
