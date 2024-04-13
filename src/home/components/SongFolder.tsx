import React, { useState } from 'react';
import { Text, View } from 'react-native';

import songFolderStyle from '@styles/songFolder';
import LyricsIcon from '@src/icons/LyricsIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/home/subcomponents/PlaybackBar';

const SongFolder = ({song}) => {
   const [isPlaying, setIsPlaying] = useState(false);

   // const handleOnPress = () => {
   //    onSearch(searchText);
   // }

   return (
    <View style={songFolderStyle.container}>
      <View style={songFolderStyle.contents}>
        <Text style={songFolderStyle.title}>{song}</Text>
        <Text>March 14, 24</Text>
        <View style={songFolderStyle.iconRow}>
          <LyricsIcon />
          <ShareIcon />
          <PlaybackBar />
        </View>
      </View>
      <View style={songFolderStyle.playIcon}>
        <PlayIcon/>
      </View>
    </View>
   );
};

export default SongFolder;