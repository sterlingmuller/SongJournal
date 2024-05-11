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
import { setCurrentSong } from '@src/slice/songSlice';

interface Props {
  song: song;
}

const SongFolder = ({ song }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();

  const { title, takes, selectedTake } = song;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleOnPress = () => {
    dispatch(setCurrentSong(song));
    navigate('Song', { song });
  };

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleOnPress}
    >
      <View style={styles.contents}>
        <StyledText style={styles.title}>{title}</StyledText>
        <StyledText>{takes[selectedTake].date}</StyledText>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigate('Lyrics', { song })}>
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
