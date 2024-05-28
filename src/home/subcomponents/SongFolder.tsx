import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/common/components/StyledText';
import LyricsIcon from '@src/icons/LyricsIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';
import { RootStackParamList, song } from '@src/common/types';
import useSongFolderStyles from '@styles/songFolder';
import { useAppDispatch } from '@src/common/hooks';
import { setCurrentSongId } from '@src/slice/currentSongSlice';

interface Props {
  song: song;
}

const SongFolder = ({ song }: Props) => {
  // const db = useSQLiteContext();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();

  const { title, songId } = song;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleOnPressNavigation = async (screen: 'Song' | 'Lyrics') => {
    // const takesAndPage: getTakesAndPageResult = await getTakesAndPageBySongId(
    //   db,
    //   songId,
    // );

    // const newCurrentSong: song = {
    //   ...songInfo,
    //   ...takesAndPage,
    // };

    dispatch(setCurrentSongId(songId));
    // dispatch(setCurrentSong(newCurrentSong));
    navigate(screen);
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
      <View style={styles.playIcon}>
        <PlayIcon />
      </View>
    </TouchableOpacity>
  );
};

export default SongFolder;
