import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import LyricsHeader from '@src/lyrics/components/LyricsHeader';
import InfoModal from '@src/lyrics/components/InfoModal';
import { RootStackParamList } from '@src/common/types';
import LyricsSheet from '@src/lyrics/components/LyricsSheet';
import useGlobalStyles from '@src/styles/global';

interface Props {
  route: RouteProp<RootStackParamList, 'Lyrics'>;
}

const LyricsScreen = ({ route }: Props) => {
  const { song } = route.params;
  const { page } = song;
  const globalStyles = useGlobalStyles();

  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <LyricsHeader
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          title={song.title}
        />
      ),
    });
  }, [isInfoModalOpen, setIsInfoModalOpen]);

  return (
    <View style={globalStyles.container}>
      <LyricsSheet page={page} />
      <InfoModal
        isInfoModalOpen={isInfoModalOpen}
        setIsInfoModalOpen={setIsInfoModalOpen}
      />
    </View>
  );
};

export default LyricsScreen;
