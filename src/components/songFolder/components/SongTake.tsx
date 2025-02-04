import React, { useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { DeleteObject, Take } from '@src/components/common/types';
import StarIcon from '@src/icons/StarIcon';
import useDoubleTap from '@src/utils/hooks/useDoubleTap';
import useSongTakeStyles from '@src/styles/songTake';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import PauseIcon from '@src/icons/PauseIcon';
import {
  selectIsPlaying,
  selectPlayingId,
} from '@src/state/selectors/playbackSelector';
import {
  selectCurrentSongSelectedTakeId,
  selectCurrentSongTitle,
} from '@src/state/selectors/songsSelector';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';
import useFileShare from '@src/utils/hooks/useFileShare';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import PlaybackBar from '@src/components/home/subcomponents/PlaybackBar';
import formatDuration from '@src/utils/formatDuration';
import StyledText from '@src/components/common/components/StyledText';
import useStarredTakeUpdateAndUpload from '@src/utils/hooks/ustStarredTakeUpdate';

interface Props {
  take: Take;
  setToDelete: (value: DeleteObject) => void;
  setCurrentTake: (value: Take) => void;
  setTitleToEdit: (value: {
    title: string;
    songId: number;
    takeId?: number;
  }) => void;
}

const SongTake = (props: Props) => {
  const { take, setToDelete, setCurrentTake, setTitleToEdit } = props;
  const { takeId, songId, title, uri, duration } = take;
  const styles = useSongTakeStyles();
  const { shareTake } = useFileShare();
  const { togglePlayback } = useAudioPlayer();
  const updateAndUploadStarredTake = useStarredTakeUpdateAndUpload();

  const selectedPlayingId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);
  const songTitle = useAppSelector(selectCurrentSongTitle);

  const inputRef = useRef<TextInput | null>(null);

  const onDoubleTap: () => void = useDoubleTap(async () => {
    updateAndUploadStarredTake(takeId, songId, uri, title);
  });

  const onTitleDoubleTap: () => void = useDoubleTap(() => {
    setTitleToEdit({ title, songId, takeId });
    setTimeout(() => inputRef.current?.focus(), 100);
  });

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
          <TouchableOpacity
            onPress={onTitleDoubleTap}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 30 }}
          >
            <StyledText style={styles.title}>{title}</StyledText>
          </TouchableOpacity>
          {isStarred && <StarIcon />}
        </View>
        <View>
          <StyledText style={styles.trackSubtext}>{formattedDate}</StyledText>
          <StyledText style={styles.trackSubtext}>
            {formatDuration(duration)}
          </StyledText>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTake(take);
            }}
            hitSlop={20}
          >
            <NotesIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} hitSlop={20}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToDelete({ type: 'take', songId, takeId, title });
            }}
            hitSlop={20}
          >
            <TrashIcon />
          </TouchableOpacity>
          {selectedPlayingId === takeId ? (
            <PlaybackBar duration={duration} fromSongTakes />
          ) : (
            <View style={styles.staticPlaybackBar} />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.playIcon}
        onPress={() => togglePlayback(take.uri, take.takeId)}
        hitSlop={{ left: 40, top: 30, right: 20, bottom: 20 }}
      >
        {isCurrentTakePlaying ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongTake;
