import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import songTakeStyle from '@styles/songTake';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';

interface Props {
  song: string;
  setIsNotesModalOpen: (value: boolean) => void;
}

const SongTake = ({ song, setIsNotesModalOpen }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={songTakeStyle.container}>
      <View style={songTakeStyle.contents}>
        <Text style={songTakeStyle.title}>{song}</Text>
        <Text>March 14, 24</Text>
        <View style={songTakeStyle.iconRow}>
          <TouchableOpacity onPress={() => null}>
            <NotesIcon />
          </TouchableOpacity>
          <ShareIcon />
          <TrashIcon />
          <View style={songTakeStyle.playbackBar} />
        </View>
      </View>
      <View style={songTakeStyle.playIcon}>
        <PlayIcon />
      </View>
    </View>
  );
};

export default SongTake;
