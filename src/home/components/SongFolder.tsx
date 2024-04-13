import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import songFolderStyle from '@styles/songFolder';

const SongFolder = ({song}) => {
   const [isPlaying, setIsPlaying] = useState(false);

   // const handleOnPress = () => {
   //    onSearch(searchText);
   // }

   return (
    <View style={songFolderStyle.container}>
      <View style={songFolderStyle.info}>
      <Text>{song}</Text>
      <Text>Date</Text>
      </View>
      {/* play icon */}
      <View>
        {/* Song book icon
        share icon
        playbar icon */}
      </View>
    </View>
   );
};

export default SongFolder;