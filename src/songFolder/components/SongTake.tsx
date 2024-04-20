import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import songTakeStyle from '@styles/songTake';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import NotesModal from '@src/songFolder/components/NotesModal';

interface Props {
  song: string;
  // setIsNotesModalOpen: (value: boolean) => void;
}

const SongTake = ({ song }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<string>('');

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
          <TrashIcon />
          <View style={songTakeStyle.playbackBar} />
        </View>
      </View>
      <View style={songTakeStyle.playIcon}>
        <PlayIcon />
      </View>
      <NotesModal isNotesModalOpen={isNotesModalOpen} setIsNotesModalOpen={setIsNotesModalOpen} />
    </View>
  );
};

export default SongTake;
