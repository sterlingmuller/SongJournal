import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/components/common/components/StyledText';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/components/home/subcomponents/PlaybackBar';
import { RootStackParamList, Song, Take } from '@src/components/common/types';
import useSongFolderStyles from '@src/styles/songFolder';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { setCurrentSongId } from '@src/state/slice/currentSongSlice';
import PauseIcon from '@src/icons/PauseIcon';
import {
  selectIsPlaying,
  selectPlayingId,
} from '@src/state/selectors/playbackSelector';
import { fetchPageRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import useDoubleTap from '@src/utils/hooks/useDoubleTap';
import { TextInput } from 'react-native-gesture-handler';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';
import useFileShare from '@src/utils/hooks/useFileShare';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import PageIcon from '@src/icons/PageIcon';
import { Screen } from '@src/components/common/enums';
import { selectCurrentSong } from '@src/state/selectors/songsSelector';
import formatDuration from '@src/utils/formatDuration';

interface Props {
  song: Song;
}

const SongFolder = ({ song }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { shareSongFolder } = useFileShare();
  const { togglePlayback, clearPlayback } = useAudioPlayer();

  const { title, songId, takes, selectedTakeId } = song;
  const [isPressed, setIsPressed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const inputRef = useRef<TextInput | null>(null);

  const selectedPlayingSongId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);

  const isCurrentSongPlaying = songId === selectedPlayingSongId && isPlaying;

  const selectedTake = useMemo(
    () => takes.find((take: Take) => take.takeId === selectedTakeId),
    [takes, selectedTakeId],
  );

  const handleShare = useCallback(() => {
    shareSongFolder(song);
  }, [shareSongFolder, song]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  const handleOnPressNavigation = useCallback(
    (screen: Screen.SONG | Screen.LYRICS) => {
      dispatch(setCurrentSongId(songId));
      if (screen === Screen.LYRICS) {
        dispatch(fetchPageRequest({ songId, db }));
      }
      clearPlayback();

      navigate(screen);
    },
    [dispatch, songId, db, navigate],
  );

  const handleBlur = useCallback(() => setIsEditing(false), []);

  const onTogglePlayback = useCallback(() => {
    if (selectedTake) {
      togglePlayback(selectedTake.uri, songId);
    }
  }, [selectedTake, togglePlayback, songId]);

  const onDoubleTap: () => void = useDoubleTap(() => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  });

  const displaySubtext = useMemo(() => {
    if (selectedTake?.date) {
      return (
        <>
          <StyledText style={styles.trackSubtext}>
            {formatDateFromISOString(selectedTake.date)}
          </StyledText>
          <StyledText style={styles.trackSubtext}>
            {formatDuration(selectedTake.duration)}
          </StyledText>
        </>
      );
    }
    return (
      <View style={styles.warningContainer}>
        <StyledText style={styles.warningText}>
          No takes have been recorded
        </StyledText>
      </View>
    );
  }, [selectedTake, styles.warningText]);

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handleOnPressNavigation(Screen.SONG)}
    >
      <View style={styles.contents}>
        <TouchableOpacity onPress={onDoubleTap}>
          {isEditing ? (
            <TextInput
              ref={inputRef}
              style={styles.editTitleText}
              value={newTitle}
              onChangeText={(text: string) => setNewTitle(text)}
              onBlur={handleBlur}
            />
          ) : (
            <StyledText style={styles.title}>{title}</StyledText>
          )}
        </TouchableOpacity>
        <View style={styles.subtextContainer}>{displaySubtext}</View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => handleOnPressNavigation(Screen.LYRICS)}
            style={{ paddingBottom: 4 }}
          >
            <PageIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon />
          </TouchableOpacity>
          {selectedPlayingSongId === songId ? (
            <PlaybackBar duration={selectedTake ? selectedTake.duration : 0} />
          ) : (
            <View style={styles.staticPlaybackBar} />
          )}
        </View>
      </View>
      {selectedTake && (
        <TouchableOpacity style={styles.playIcon} onPress={onTogglePlayback}>
          {isCurrentSongPlaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SongFolder;
