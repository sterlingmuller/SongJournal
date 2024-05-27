import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';

import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';
import useLyricsHeaderStyles from '@src/styles/lyricsHeader';
import { selectSongTitleBySongId } from '@src/selectors/songsSelector';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
}

const LyricsHeader = (props: Props) => {
  const { isInfoModalOpen, setIsInfoModalOpen } = props;
  const styles = useLyricsHeaderStyles();
  const title = useSelector(selectSongTitleBySongId);

  return (
    <View style={styles.container}>
      <View style={styles.titlePlusArrow}>
        <BackIcon />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.info}
        onPress={() => setIsInfoModalOpen(!isInfoModalOpen)}
      >
        <InfoIcon />
      </TouchableOpacity>
    </View>
  );
};

export default LyricsHeader;
