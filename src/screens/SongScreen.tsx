import React, { useState } from 'react';
import { View } from 'react-native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import global from '@src/styles/global';
import songScreenStyle from '@src/styles/songScreen';
import DeleteModal from '@src/common/components/DeleteModal';

const SongScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string>('');

  return (
    <View style={global.container}>
      <View style={songScreenStyle.takes}>
        <SongTake song="Take 5" />
        <SongTake song="Take 4" />
        <SongTake song="Take 3" />
        <SongTake song="Take 2" />
        <SongTake song="Take 1" />
      </View>
      <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </View>
  );
};

export default SongScreen;
