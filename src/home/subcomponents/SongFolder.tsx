import React, { useState } from 'react';
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

interface Props {
  song: song;
  togglePlayback: (uri: string, id: number) => void;
}

const SongFolder = ({ song, togglePlayback }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();
  const { title, songId } = song;
  const [isPressed, setIsPressed] = useState(false);

  const selectedPlayingSongId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);

  const isCurrentSongPlaying = songId === selectedPlayingSongId && isPlaying;

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleOnPressNavigation = async (screen: 'Song' | 'Lyrics') => {
    dispatch(setCurrentSongId(songId));
    navigate(screen);
  };

  const onTogglePlayback = () => {
    const selectedTake = song.takes.find(
      (take: take) => take.takeId === song.selectedTakeId,
    );

    if (selectedTake) {
      togglePlayback(selectedTake.uri, song.songId);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handleOnPressNavigation('Song')}
    >
      <View style={styles.contents}>
        <StyledText style={styles.title}>{title}</StyledText>
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
