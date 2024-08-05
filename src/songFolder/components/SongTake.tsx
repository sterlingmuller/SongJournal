import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { deleteObject, take } from '@src/common/types';
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
import {
  selectCurrentSongSelectedTakeId,
  selectCurrentSongTitle,
} from '@src/selectors/songsSelector';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';
import useFileShare from '@src/hooks/useFileShare';

interface Props {
  take: take;
  setToDelete: (value: deleteObject) => void;
  setCurrentTake: (value: take) => void;
  onTogglePlayback: (uri: string, takeId: number) => void;
}

const SongTake = (props: Props) => {
  const { take, setToDelete, setCurrentTake, onTogglePlayback } = props;
  const { takeId, songId, title, uri } = take;
  const styles = useSongTakeStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { shareTake } = useFileShare();

  const selectedPlayingId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);
  const songTitle = useAppSelector(selectCurrentSongTitle);

  const onDoubleTap: () => void = useDoubleTap(() =>
    dispatch(updateSelectedTakeIdRequest({ takeId, songId, db })),
  );

  const isStarred = take.takeId === selectedTakeId;
  const isCurrentTakePlaying = takeId === selectedPlayingId && isPlaying;

  const formattedDate = formatDateFromISOString(take.date);

  const handleShare = () => {
    shareTake(uri, title, songTitle);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onDoubleTap}>
      <View style={styles.contents}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {isStarred && <StarIcon />}
        </View>
        <Text>{formattedDate}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTake(take);
            }}
          >
            <NotesIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToDelete({ type: 'take', songId, takeId, title });
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
