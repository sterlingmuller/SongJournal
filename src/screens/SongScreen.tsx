import React, { useLayoutEffect, useState } from 'react';
import { View, text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import global from '@src/styles/global';
import songScreenStyle from '@src/styles/songScreen';

const SongScreen = () => {
  const navigation = useNavigation();

  const [isRecording, setIsRecording] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: () => <HomeHeader isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />,
  //   });
  // }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={global.container}>
      <View style={songScreenStyle.takes}>
        <SongTake song="Take 5" setIsNotesModalOpen={setIsNotesModalOpen} />
        <SongTake song="Take 4" setIsNotesModalOpen={setIsNotesModalOpen} />
        <SongTake song="Take 3" setIsNotesModalOpen={setIsNotesModalOpen} />
        <SongTake song="Take 2" setIsNotesModalOpen={setIsNotesModalOpen} />
        <SongTake song="Take 1" setIsNotesModalOpen={setIsNotesModalOpen} />
      </View>
      <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
    </View>
  );
};

export default SongScreen;
