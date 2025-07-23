import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { DeleteObject, Take } from '@src/components/common/types';
import StarIcon from '@src/icons/StarIcon';
import useDoubleTap from '@src/hooks/useDoubleTap';
import useSongTakeStyles from '@src/styles/songTake';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
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
import useFileShare from '@src/hooks/useFileShare';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import PlaybackBar from '@src/components/home/subcomponents/PlaybackBar';
import formatDuration from '@src/utils/formatDuration';
import StyledText from '@src/components/common/components/StyledText';
import useStarredTakeUpdateAndUpload from '@src/hooks/useStarredTakeUpdate';
import { calculateHitSlop } from '@src/utils/calculateHitSlope';

interface Props {
  take: Take;
  setToDelete: (value: DeleteObject) => void;
  setCurrentTake: (value: Take) => void;
  setIsNotesOpen: (value: boolean) => void;
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
  }) => void;
}

const SongTake = (props: Props) => {
  const { take, setToDelete, setCurrentTake, setIsNotesOpen, setTitleToEdit } =
    props;
  const { takeId, songId, title, uri, duration, date } = take;
  const styles = useSongTakeStyles();
  const { shareTake } = useFileShare();
  const { togglePlayback } = useAudioPlayer();
  const updateAndUploadStarredTake = useStarredTakeUpdateAndUpload();

  const selectedPlayingId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);
  const songTitle = useAppSelector(selectCurrentSongTitle);

  const onDoubleTap: () => void = useDoubleTap(async () => {
    if (takeId !== selectedTakeId) {
      updateAndUploadStarredTake(takeId, songId, uri, title);
    }
  });

  const isStarred = take.takeId === selectedTakeId;
  const isCurrentTakePlaying = takeId === selectedPlayingId && isPlaying;

  const formattedDate = formatDateFromISOString(take.date);
  const formattedDuration = useMemo(() => formatDuration(duration), [duration]);

  const handleShare = () => {
    shareTake(uri, title, songTitle, date);
  };

  const handleTitleEdit = () => {
    setTitleToEdit({ songTitle, takeTitle: title, songId, takeId });
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    handleTitleEdit();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onDoubleTap}
      onLongPress={handleLongPress}
      delayLongPress={250}
    >
      <View style={styles.contents}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={onDoubleTap}
            onLongPress={handleLongPress}
            delayLongPress={250}
            hitSlop={{ top: 15, bottom: 20, left: 20, right: 30 }}
          >
            <StyledText style={styles.title}>{title}</StyledText>
          </TouchableOpacity>
          {isStarred && <StarIcon />}
        </View>
        <View>
          <StyledText style={styles.trackSubtext}>{formattedDate}</StyledText>
          <StyledText style={styles.trackSubtext}>
            {formattedDuration}
          </StyledText>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTake(take);
              setIsNotesOpen(true);
            }}
            hitSlop={calculateHitSlop({ width: 32, height: 32 })}
          >
            <NotesIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            hitSlop={calculateHitSlop({ width: 32, height: 32 })}
          >
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToDelete({ type: 'take', songId, takeId, title });
            }}
            hitSlop={calculateHitSlop({ width: 32, height: 32 })}
          >
            <TrashIcon size={32} />
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
        hitSlop={{ left: 40, top: 30, right: 20, bottom: 0 }}
      >
        {isCurrentTakePlaying ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongTake;
