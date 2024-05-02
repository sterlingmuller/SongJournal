import React, { useState } from 'react';
import { View } from 'react-native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT, EMPTY_TAKE } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList, take } from '@src/common/types';
import { RouteProp } from '@react-navigation/native';
import useSongScreenStyles from '@src/styles/songScreen';

interface Props {
  route: RouteProp<RootStackParamList, 'Song'>;
}

const SongScreen = ({ route }: Props) => {
  const { song } = route.params;
  const styles = useSongScreenStyles();

  const [currentTake, setCurrentTake] = useState<take>(EMPTY_TAKE);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);

  const takes: take[] = [...song.takes].reverse();

  return (
    <View>
      <ScrollView>
        <View style={styles.takes}>
          {takes.map((take: take) => (
            <SongTake
              key={take.title}
              take={take}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsNotesModalOpen={setIsNotesModalOpen}
              setCurrentTake={setCurrentTake}
            />
          ))}
        </View>
      </ScrollView>
      <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteText={DELETE_TAKE_TEXT}
        setCurrentTake={setCurrentTake}
        currentTake={currentTake}
      />
      <NotesModal
        isNotesModalOpen={isNotesModalOpen}
        setIsNotesModalOpen={setIsNotesModalOpen}
        setCurrentTake={setCurrentTake}
        currentTake={currentTake}
      />
    </View>
  );
};

export default SongScreen;
