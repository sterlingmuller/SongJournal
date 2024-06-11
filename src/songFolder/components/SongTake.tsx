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
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { updateSelectedTakeIdRequest } from '@src/sagas/actionCreators';
import PauseIcon from '@src/icons/PauseIcon';
import {
  selectIsPlaying,
  selectPlayingId,
} from '@src/selectors/playbackSelector';
import { selectCurrentSongSelectedTakeId } from '@src/selectors/songsSelector';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';

interface Props {
  take: take;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsNotesModalOpen: (value: boolean) => void;
  onTogglePlayback: (uri: string, id: number) => void;
}

const SongTake = (props: Props) => {
  const { take, setIsDeleteModalOpen, setIsNotesModalOpen, onTogglePlayback } =
    props;
  const { takeId, songId } = take;
  const styles = useSongTakeStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();

  const selectedPlayingId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);

  const onDoubleTap: () => void = useDoubleTap(() =>
    dispatch(updateSelectedTakeIdRequest({ takeId, songId, db })),
  );

  const isStarred = take.takeId === selectedTakeId;
  const isCurrentTakePlaying = takeId === selectedPlayingId && isPlaying;

  const formattedDate = formatDateFromISOString(take.date);

  return (
    <TouchableOpacity style={styles.container} onPress={onDoubleTap}>
      <View style={styles.contents}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{take.title}</Text>
          {isStarred && <StarIcon />}
        </View>
        <Text>{formattedDate}</Text>
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
        onPress={() => onTogglePlayback(take.uri, take.takeId)}
      >
        {isCurrentTakePlaying ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongTake;
