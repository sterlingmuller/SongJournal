import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';
import useLyricsHeaderStyles from '@src/styles/lyricsHeader';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  title: string;
}

const LyricsHeader = (props: Props) => {
  const { isInfoModalOpen, setIsInfoModalOpen, title } = props;
  const styles = useLyricsHeaderStyles();

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
