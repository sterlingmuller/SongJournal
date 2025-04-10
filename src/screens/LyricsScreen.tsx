import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, View } from 'react-native';
import {
  EventArg,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import LyricsHeader from '@src/components/lyrics/subcomponents/LyricsHeader';
import SongDetailsModal from '@src/components/lyrics/components/SongDetailsModal';
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
import EditLyricsSheet from '@src/components/lyrics/components/EditLyricsSheet';
import LyricsInfoModal from '@src/components/lyrics/components/LyricsInfoModal';

const LyricsScreen = () => {
  const styles = useLyricScreenStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, Screen.LYRICS>>();

  const page = useAppSelector(selectCurrentSongPage);
  const songId = useAppSelector(selectCurrentSongId);
  const { updateLyrics } = useLyricsSheetGenerator();

  const [headerHeight, setHeaderHeight] = useState(0);
  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isSongDetailsModalOpen, setIsSongDetailsModalOpen] =
    useState<boolean>(false);
  const [hasDetailChanges, setHasDetailChanges] = useState<boolean>(false);
  const [hasLyricChanges, setHasLyricChanges] = useState<boolean>(false);
  const [newLyrics, setNewLyrics] = useState<string>('');

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'beforeRemove',
      (e: EventArg<'beforeRemove', true, undefined>) => {
        if (!hasDetailChanges && !hasLyricChanges) {
          if (route.params?.previousScreen === Screen.HOME) {
            dispatch(setCurrentSongId(-1));
          }
          return;
        }

        e.preventDefault();

        Alert.alert(
          'You have unsaved changes',
          ' If you leave now, your changes will be lost. Would you like to continue editing?',
          [
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
            {
              text: 'Continue Editing',
              style: 'cancel',
              onPress: () => {},
            },
          ],
        );
      },
    );

    return unsubscribe;
  }, [
    navigation,
    hasLyricChanges,
    hasDetailChanges,
    route.params?.previousScreen,
    dispatch,
  ]);

  const [selectedOption, setSelectedOption] = useState<LyricsOption>(
    LyricsOption.NONE,
  );

  useEffect(() => {
    if (page && (newLyrics === '' || selectedOption !== LyricsOption.EDIT)) {
      setNewLyrics(page.lyrics);
    }
  }, [page?.lyrics]);

  useEffect(() => {
    if (selectedOption === LyricsOption.ADD_DETAILS) {
      setIsSongDetailsModalOpen(true);
    }
  }, [selectedOption]);

  const handleSaveLyrics = useCallback(async () => {
    await updateLyrics(newLyrics);
    if (newLyrics) {
      setSelectedOption(LyricsOption.NONE);
    }
  }, [newLyrics, updateLyrics]);

  const handleCancelEdit = useCallback(() => {
    setNewLyrics(page?.lyrics || '');
    setSelectedOption(LyricsOption.NONE);
    setHasLyricChanges(false);
  }, [page?.lyrics]);

  useEffect(() => {
    if (page?.lyrics) {
      setHasLyricChanges(newLyrics !== page.lyrics);
    }
  }, [newLyrics, page?.lyrics]);

  const headerOptions = useMemo(
    () => ({
      header: () => (
        <LyricsHeader
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          displaySave={hasLyricChanges}
          handleSaveLyrics={handleSaveLyrics}
          handleCancelEdit={handleCancelEdit}
          headerHeight={headerHeight}
          setHeaderHeight={setHeaderHeight}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ),
    }),
    [
      hasLyricChanges,
      handleSaveLyrics,
      handleCancelEdit,
      headerHeight,
      selectedOption,
    ],
  );

  useLayoutEffect(() => {
    setOptions(headerOptions);
  }, [headerOptions, setOptions]);

  if (!page) {
    return <LoadingIndicator />;
  }

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case LyricsOption.EDIT:
        return (
          <EditLyricsSheet
            newLyrics={newLyrics}
            setNewLyrics={setNewLyrics}
            headerHeight={headerHeight}
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
        <SongDetailsModal
          isSongDetailsModalOpen={isSongDetailsModalOpen}
          setIsSongDetailsModalOpen={setIsSongDetailsModalOpen}
          info={page.info}
          songId={songId}
          setSelectedOption={setSelectedOption}
          setHasDetailChanges={setHasDetailChanges}
          hasDetailChanges={hasDetailChanges}
        />
      )}
      <LyricsInfoModal
        isInfoModalOpen={isInfoModalOpen}
        setIsInfoModalOpen={setIsInfoModalOpen}
      />
    </View>
  );
};

export default LyricsScreen;
