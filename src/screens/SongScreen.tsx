import React, { useState } from 'react';
import { View } from 'react-native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import global from '@src/styles/global';
import songScreenStyle from '@src/styles/songScreen';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
const SongScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string>('');
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<string>('');

  return (
    <View style={global.container}>
      <ScrollView>
        <View style={songScreenStyle.takes}>
          <SongTake
            song="Take 6"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
          <SongTake
            song="Take 5"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
          <SongTake
            song="Take 4"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
          <SongTake
            song="Take 3"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
          <SongTake
            song="Take 2"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
          <SongTake
            song="Take 1"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsNotesModalOpen={setIsNotesModalOpen}
          />
        </View>
      </ScrollView>
      <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteText={DELETE_TAKE_TEXT}
      />
      <NotesModal
        isNotesModalOpen={isNotesModalOpen}
        setIsNotesModalOpen={setIsNotesModalOpen}
      />
    </View>
  );
};

export default SongScreen;
