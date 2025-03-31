import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import LyricsHeader from '@src/components/lyrics/components/LyricsHeader';
import InfoModal from '@src/components/lyrics/components/InfoModal';
import LyricsSheet from '@src/components/lyrics/components/LyricsSheet';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import { selectCurrentSongPage } from '@src/state/selectors/pagesSelector';
import LoadingIndicator from '@src/components/common/components/LoadingIndicator';
import useLyricScreenStyles from '@styles/lyricsScreen';
import OptionsBar from '@src/components/lyrics/subcomponents/OptionsBar';
import { LyricsOption, Screen } from '@src/components/common/enums';
import useLyricsSheetGenerator from '@src/hooks/useLyricsSheetGenerator';
import { useDispatch } from 'react-redux';
import { setCurrentSongId } from '@src/state/slice/currentSongSlice';
import { RootStackParamList } from '@src/components/common/types';
import TestEditLyricsSheet from '@src/components/lyrics/components/TestEditLyricsSheet';

const LyricsScreen = () => {
  const styles = useLyricScreenStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, Screen.LYRICS>>();

  const page = useAppSelector(selectCurrentSongPage);
  const songId = useAppSelector(selectCurrentSongId);
  const { updateLyrics } = useLyricsSheetGenerator();

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (route.params?.previousScreen === Screen.HOME) {
        dispatch(setCurrentSongId(-1));
      }
    });
  }, [navigation]);

  const [selectedOption, setSelectedOption] = useState<LyricsOption>(
    LyricsOption.NONE,
  );

  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [newLyrics, setNewLyrics] = useState<string>('');

  useEffect(() => {
    if (page && !page.lyrics) {
      setSelectedOption(LyricsOption.EDIT);
    } else if (page && newLyrics !== page.lyrics) {
      setNewLyrics(page.lyrics);
    }
  }, [page]);

  const handleSaveLyrics = () => {
    updateLyrics(newLyrics);

    if (newLyrics) {
      setSelectedOption(LyricsOption.NONE);
    }
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

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case LyricsOption.EDIT:
        return (
          <TestEditLyricsSheet
            newLyrics={newLyrics}
            setNewLyrics={setNewLyrics}
          />
        );
      case LyricsOption.CHORDS:
        return (
          <TestEditLyricsSheet
            newLyrics={newLyrics}
            setNewLyrics={setNewLyrics}
          />
        );
      default:
        return <LyricsSheet lyrics={page.lyrics} />;
    }
  };

  return (
    <View style={styles.container}>
      <OptionsBar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        page={page}
      />
      {renderSelectedOption()}
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
