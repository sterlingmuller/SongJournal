import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import songTakeStyle from '@styles/songTake';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { take } from '@src/common/types';

interface Props {
  take: take;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsNotesModalOpen: (value: boolean) => void;
  setCurrentTake: (value: take) => void;
}

const SongTake = (props: Props) => {
  const { take, setIsDeleteModalOpen, setIsNotesModalOpen, setCurrentTake } =
    props;

  return (
    <View style={songTakeStyle.container}>
      <View style={songTakeStyle.contents}>
        <Text style={songTakeStyle.title}>{take.title}</Text>
        <Text>{take.date}</Text>
        <View style={songTakeStyle.iconRow}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTake(take);
              setIsNotesModalOpen(true);
            }}
          >
            <NotesIcon />
          </TouchableOpacity>
          <ShareIcon />å
          <TouchableOpacity
            onPress={() => {
              setCurrentTake(take);
              setIsDeleteModalOpen(true);
            }}
          >
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
