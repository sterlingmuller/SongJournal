import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/common/components/StyledText';
import LyricsIcon from '@src/icons/LyricsIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';
import { RootStackParamList, songInfo, take } from '@src/common/types';
import useSongFolderStyles from '@styles/songFolder';
import { useAppDispatch } from '@src/common/hooks';
import { setCurrentSong } from '@src/slice/currentSongSlice';
import { useSQLiteContext } from 'expo-sqlite';
import { getSongTakesBySongId } from '@src/repositories/SongsRepository';

interface Props {
  songInfo: songInfo;
}

const SongFolder = ({ songInfo }: Props) => {
  const db = useSQLiteContext();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();

  const { title, songId } = songInfo;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleSongOnPress = async () => {
    const test = [];

    const result: take[] = await getSongTakesBySongId(db, songId);
    if (result) {
      test.push(result);
    }
    dispatch(setCurrentSong({ ...songInfo, takes: test }));

    navigate('Song');
  };

  const handleLyricsOnPress = () => {
    // dispatch(setCurrentSongPage(songInfo));
    navigate('Lyrics');
  };

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleSongOnPress}
    >
      <View style={styles.contents}>
        <StyledText style={styles.title}>{title}</StyledText>
        {/* <StyledText>{takes[selectedTake].date}</StyledText> */}
        <StyledText>Workin on it</StyledText>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleLyricsOnPress}>
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
