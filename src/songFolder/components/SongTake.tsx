import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import songTakeStyle from '@styles/songTake';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';

interface Props {
  song: string;
  setIsDeleteModalOpen: (value: string) => void;
  setIsNotesModalOpen: (value: string) => void;
}

const SongTake = (props: Props) => {
  const { song, setIsDeleteModalOpen, setIsNotesModalOpen } = props;

  return (
    <View style={songTakeStyle.container}>
      <View style={songTakeStyle.contents}>
        <Text style={songTakeStyle.title}>{song}</Text>
        <Text>March 14, 24</Text>
        <View style={songTakeStyle.iconRow}>
          <TouchableOpacity onPress={() => setIsNotesModalOpen(song)}>
            <NotesIcon />
          </TouchableOpacity>
          <ShareIcon />
          <TouchableOpacity onPress={() => setIsDeleteModalOpen(song)}>
            <TrashIcon />
          </TouchableOpacity>
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
