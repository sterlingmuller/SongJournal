import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import NotesIcon from '@src/icons/NotesIcon';
import TrashIcon from '@src/icons/TrashIcon';
import { take } from '@src/common/types';
import StarIcon from '@src/icons/StarIcon';
import useDoubleTap from '@src/hooks/useDoubleTap';
import useSongTakeStyles from '@styles/songTake';

interface Props {
  take: take;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsNotesModalOpen: (value: boolean) => void;
}

const SongTake = (props: Props) => {
  const { take, setIsDeleteModalOpen, setIsNotesModalOpen } = props;
  const styles = useSongTakeStyles();

  const onDoubleTap: () => void = useDoubleTap(() => console.log('it works!'));

  return (
    <TouchableOpacity style={styles.container} onPress={onDoubleTap}>
      <View style={styles.contents}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{take.title}</Text>
          {/* {take.starred && <StarIcon />} */}
        </View>
        <Text>{take.date}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => {
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
          <View style={styles.playbackBar} />
        </View>
      </View>
      <View style={styles.playIcon}>
        <PlayIcon />
      </View>
    </TouchableOpacity>
  );
};

export default SongTake;
