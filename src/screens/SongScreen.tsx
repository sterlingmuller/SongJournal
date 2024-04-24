import React, { useState } from 'react';
import { View } from 'react-native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import global from '@src/styles/global';
import songScreenStyle from '@src/styles/songScreen';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';

const SongScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string>('');
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<string>('');

  return (
    <View style={global.container}>
      <View style={songScreenStyle.takes}>
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
      <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <NotesModal
        isNotesModalOpen={isNotesModalOpen}
        setIsNotesModalOpen={setIsNotesModalOpen}
      />
    </View>
  );
};

export default SongScreen;
