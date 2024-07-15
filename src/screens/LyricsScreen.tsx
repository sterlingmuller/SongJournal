import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';

import LyricsHeader from '@src/lyrics/components/LyricsHeader';
import InfoModal from '@src/lyrics/components/InfoModal';
import LyricsSheet from '@src/lyrics/components/LyricsSheet';
import { useAppSelector } from '@src/common/hooks';
import {
  selectCurrentSongId,
  selectCurrentSongPage,
} from '@src/selectors/songsSelector';
import LoadingIndicator from '@src/common/components/LoadingIndicator';
import useLyricScreenStyles from '@src/styles/lyricsScreen';
import { LyricsOptionName, songDetail } from '@src/common/types';
import OptionsBar from '@src/lyrics/subcomponents/OptionsBar';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import { SONG_DETAILS } from '@src/common/constants';
import EditLyricsSheet from '@src/lyrics/components/EditLyricsSheet';

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
      <View style={styles.infoContainer}>
        <View style={styles.details}>
          {SONG_DETAILS.map(
            ({ label, key }: songDetail) =>
              !!page[key] && (
                <SongDetail
                  key={key}
                  detailKey={key}
                  label={label}
                  value={page[key]}
                  onPageScreen
                  handleInputChange={() => {}}
                />
              ),
          )}
        </View>
        <OptionsBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          page={page}
        />
      </View>
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
