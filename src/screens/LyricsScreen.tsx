import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LyricsHeader from '@src/lyrics/components/LyricsHeader';
import InfoModal from '@src/lyrics/components/InfoModal';
import LyricsSheet from '@src/lyrics/components/LyricsSheet';
import useGlobalStyles from '@src/styles/global';

const LyricsScreen = () => {
  const globalStyles = useGlobalStyles();

  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <LyricsHeader
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
      ),
    });
  }, [isInfoModalOpen, setIsInfoModalOpen]);

  return (
    <View style={globalStyles.container}>
      <LyricsSheet />
      <InfoModal
        isInfoModalOpen={isInfoModalOpen}
        setIsInfoModalOpen={setIsInfoModalOpen}
      />
    </View>
  );
};

export default LyricsScreen;
