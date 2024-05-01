import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import songTakeStyle from '@styles/songTake';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { take } from '@src/common/types';
import StarIcon from '@src/icons/StarIcon';
import useDoubleTap from '@src/hooks/useDoubleTap';

interface Props {
  take: take;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsNotesModalOpen: (value: boolean) => void;
  setCurrentTake: (value: take) => void;
}

const SongTake = (props: Props) => {
  const { take, setIsDeleteModalOpen, setIsNotesModalOpen, setCurrentTake } =
    props;

  const onDoubleTap: () => void = useDoubleTap(() => console.log('it works!'));

  return (
    <TouchableOpacity style={songTakeStyle.container} onPress={onDoubleTap}>
      <View style={songTakeStyle.contents}>
        <View style={songTakeStyle.titleRow}>
          <Text style={songTakeStyle.title}>{take.title}</Text>
          {take.starred && <StarIcon />}
        </View>
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
          <ShareIcon />
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
    </TouchableOpacity>
  );
};

export default SongTake;
