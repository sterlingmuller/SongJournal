import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/common/components/StyledText';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';
import { RootStackParamList, song, take } from '@src/common/types';
import useSongFolderStyles from '@styles/songFolder';
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { setCurrentSongId } from '@src/slice/currentSongSlice';
import PauseIcon from '@src/icons/PauseIcon';
import {
  selectIsPlaying,
  selectPlayingId,
} from '@src/selectors/playbackSelector';
import { fetchPageRequest } from '@src/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import useDoubleTap from '@src/hooks/useDoubleTap';
import { TextInput } from 'react-native-gesture-handler';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';
import useFileShare from '@src/hooks/useFileShare';
import { useAudioPlayer } from '@src/context/AudioContext';
import PageIcon from '@src/icons/PageIcon';

interface Props {
  song: song;
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
    () => takes.find((take: take) => take.takeId === selectedTakeId),
    [takes, selectedTakeId],
  );

  const handleShare = useCallback(() => {
    shareSongFolder(song);
  }, [shareSongFolder, song]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  const handleOnPressNavigation = useCallback(
    (screen: 'Song' | 'Lyrics') => {
      dispatch(setCurrentSongId(songId));
      if (screen === 'Lyrics') {
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

  const formattedDate = useMemo(() => {
    if (selectedTake?.date) {
      return (
        <StyledText>{formatDateFromISOString(selectedTake.date)}</StyledText>
      );
    }
    return (
      <StyledText style={styles.warningText}>
        No takes have been recorded
      </StyledText>
    );
  }, [selectedTake, styles.warningText]);

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handleOnPressNavigation('Song')}
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
        {formattedDate}
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => handleOnPressNavigation('Lyrics')}
            style={{ paddingBottom: 4 }}
          >
            <PageIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon />
          </TouchableOpacity>
          <PlaybackBar />
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
