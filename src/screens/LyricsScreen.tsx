import React, { useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import LyricsHeader from '@src/lyrics/components/LyricsHeader';
import InfoModal from '@src/lyrics/components/InfoModal';
import { RootStackParamList } from '@src/common/types';

interface Props {
  route: RouteProp<RootStackParamList, 'Lyrics'>;
}

const LyricsScreen = ({ route }: Props) => {
  const { currentSong } = route.params;

  const navigation = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <LyricsHeader
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          title={currentSong}
        />
      ),
    });
  }, [isInfoModalOpen, setIsInfoModalOpen]);

  return (
    <View>
      <Text>Lyrics screen</Text>
      <InfoModal isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen} />
    </View>
  );
};

export default LyricsScreen;
