import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import songFolderStyle from '@styles/songFolder';
import LyricsIcon from '@src/icons/LyricsIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';
import { RootStackParamList } from '@src/common/types';

interface Props {
  song: string;
}

const SongFolderContent = ({ song }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      style={[
        songFolderStyle.rowContainer,
        isPressed && songFolderStyle.rowPressed,
      ]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigate('CurrentSongFolder', { currentSong: song })}
    >
      <View style={songFolderStyle.contents}>
        <Text style={songFolderStyle.title}>{song}</Text>
        <Text>March 14, 24</Text>
        <View style={songFolderStyle.iconRow}>
          <TouchableOpacity
            onPress={() => navigate('Lyrics', { currentSong: song })}
          >
            <LyricsIcon />
          </TouchableOpacity>
          <ShareIcon />
          <PlaybackBar />
        </View>
      </View>
      <View style={songFolderStyle.playIcon}>
        <PlayIcon />
      </View>
    </TouchableOpacity>
  );
};

export default SongFolderContent;
