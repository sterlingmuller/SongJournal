import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LyricsHeader from '@src/components/lyrics/components/LyricsHeader';
import InfoModal from '@src/components/lyrics/components/InfoModal';
import LyricsSheet from '@src/components/lyrics/components/LyricsSheet';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import { selectCurrentSongPage } from '@src/state/selectors/pagesSelector';
import LoadingIndicator from '@src/components/common/components/LoadingIndicator';
import useLyricScreenStyles from '@styles/lyricsScreen';
import { LyricsOptionName } from '@src/components/common/types';
import OptionsBar from '@src/components/lyrics/subcomponents/OptionsBar';
import EditLyricsSheet from '@src/components/lyrics/components/EditLyricsSheet';

const LyricsScreen = () => {
  const styles = useLyricScreenStyles();
  const page = useAppSelector(selectCurrentSongPage);
  const songId = useAppSelector(selectCurrentSongId);

  const [selectedOption, setSelectedOption] = useState<LyricsOptionName>('');

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

  useEffect(() => {
    if (page && !page.lyrics) {
      setSelectedOption('Edit');
    }
  }, [page]);

  if (!page) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <OptionsBar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        page={page}
      />
      {selectedOption === 'Edit' ? (
        <EditLyricsSheet
          setSelectedOption={setSelectedOption}
          songId={songId}
        />
      ) : (
        <LyricsSheet lyrics={page.lyrics} />
      )}
      {!!page.info && (
        <InfoModal
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          info={page.info}
          songId={songId}
        />
      )}
    </View>
  );
};

export default LyricsScreen;
