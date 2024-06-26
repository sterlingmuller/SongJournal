import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LyricsHeader from '@src/lyrics/components/LyricsHeader';
import InfoModal from '@src/lyrics/components/InfoModal';
import LyricsSheet from '@src/lyrics/components/LyricsSheet';
import useGlobalStyles from '@src/styles/global';
import { useAppSelector } from '@src/common/hooks';
import {
  selectCurrentSongId,
  selectCurrentSongPage,
} from '@src/selectors/songsSelector';
import LoadingIndicator from '@src/common/components/LoadingIndicator';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { LyricsOptionName, songDetail } from '@src/common/types';
import OptionsBar from '@src/lyrics/subcomponents/OptionsBar';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import { SONG_DETAILS } from '@src/common/constants';
import EditLyricsSheet from '@src/lyrics/components/EditLyricsSheet';

const LyricsScreen = () => {
  const globalStyles = useGlobalStyles();
  const styles = useLyricSheetStyles();
  const page = useAppSelector(selectCurrentSongPage);
  const songId = useAppSelector(selectCurrentSongId);

  const [selectedOption, setSelectedOption] = useState<LyricsOptionName>('');

  const { setOptions } = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  console.log('page:', page);

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
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.details}>
            {SONG_DETAILS.map(
              ({ label, key }: songDetail) =>
                !!page[key] && (
                  <SongDetail
                    key={label}
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
    </View>
  );
};

export default LyricsScreen;
