import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/common/components/StyledText';
import LyricsIcon from '@src/icons/LyricsIcon';
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

interface Props {
  song: song;
  togglePlayback: (uri: string, id: number) => void;
}

const SongFolder = ({ song, togglePlayback }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();

  const { title, songId } = song;
  const [isPressed, setIsPressed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const inputRef = useRef<TextInput | null>(null);

  const selectedPlayingSongId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);

  const isCurrentSongPlaying = songId === selectedPlayingSongId && isPlaying;

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleOnPressNavigation = (screen: 'Song' | 'Lyrics') => {
    dispatch(setCurrentSongId(songId));
    if (screen === 'Lyrics') {
      dispatch(fetchPageRequest({ songId, db }));
    }
    navigate(screen);
  };

  // add check and x under title to save title change
  const handleBlur = () => {
    setIsEditing(false);
  };

  const onTogglePlayback = () => {
    const selectedTake = song.takes.find(
      (take: take) => take.takeId === song.selectedTakeId,
    );

    if (selectedTake) {
      togglePlayback(selectedTake.uri, song.songId);
    }
  };

  const onDoubleTap: () => void = useDoubleTap(() => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  });

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
        {/* <StyledText>{takes[selectedTake].date}</StyledText> */}
        <StyledText>Workin on it</StyledText>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleOnPressNavigation('Lyrics')}>
            <LyricsIcon />
          </TouchableOpacity>
          <ShareIcon />
          <PlaybackBar />
        </View>
      </View>
      <TouchableOpacity style={styles.playIcon} onPress={onTogglePlayback}>
        {isCurrentSongPlaying ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongFolder;
