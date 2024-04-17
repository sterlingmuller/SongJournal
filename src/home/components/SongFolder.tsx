import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import songFolderStyle from '@styles/songFolder';
import LyricsIcon from '@src/icons/LyricsIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';

interface Props {
  song: string;
}

const SongFolder = ({ song }: Props) => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={songFolderStyle.container}>
      <View style={songFolderStyle.contents}>
        <Text style={songFolderStyle.title}>{song}</Text>
        <Text>March 14, 24</Text>
        <View style={songFolderStyle.iconRow}>
          <TouchableOpacity onPress={() => navigate('Lyrics')}>
            <LyricsIcon />
          </TouchableOpacity>
          <ShareIcon />
          <PlaybackBar />
        </View>
      </View>
      <View style={songFolderStyle.playIcon}>
        <PlayIcon />
      </View>
    </View>
  );
};

export default SongFolder;
