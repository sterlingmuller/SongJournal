import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
import OptionsBar from '@src/components/lyrics/subcomponents/OptionsBar';
import EditLyricsSheet from '@src/components/lyrics/components/EditLyricsSheet';
import { LyricsOption } from '@src/components/common/enums';
import useLyricsSheetGenerator from '@src/utils/hooks/useLyricsSheetGenerator';

const LyricsScreen = () => {
  const styles = useLyricScreenStyles();
  const page = useAppSelector(selectCurrentSongPage);
  const songId = useAppSelector(selectCurrentSongId);
  const { updateLyrics } = useLyricsSheetGenerator();

  const [selectedOption, setSelectedOption] = useState<LyricsOption>(
    LyricsOption.NONE,
  );

  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [newLyrics, setNewLyrics] = useState<string>('');

  useEffect(() => {
    if (page && !page.lyrics) {
      setSelectedOption(LyricsOption.EDIT);
    }
    if (page && newLyrics !== page.lyrics) {
      setNewLyrics(page.lyrics);
    }
  }, [page]);

  const handleSaveLyrics = () => {
    updateLyrics(newLyrics);

    setSelectedOption(LyricsOption.NONE);
  };

  const handleCancelEdit = () => {
    setNewLyrics(page?.lyrics || '');
    setSelectedOption(LyricsOption.NONE);
  };

  const displaySave = useMemo(
    () => selectedOption === LyricsOption.EDIT && newLyrics !== page?.lyrics,
    [selectedOption, newLyrics, page?.lyrics],
  );

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <LyricsHeader
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          displaySave={displaySave}
          handleSaveLyrics={handleSaveLyrics}
          handleCancelEdit={handleCancelEdit}
        />
      ),
    });
  }, [isInfoModalOpen, setIsInfoModalOpen, displaySave, newLyrics]);

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
      {selectedOption === LyricsOption.EDIT ? (
        <EditLyricsSheet newLyrics={newLyrics} setNewLyrics={setNewLyrics} />
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
