import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import lyricsHeaderStyles from '@src/styles/lyricsHeader';
import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  title: string;
}

const LyricsHeader = (props: Props) => {
  const { isInfoModalOpen, setIsInfoModalOpen, title } = props;

  return (
    <View style={lyricsHeaderStyles.container}>
      <View style={lyricsHeaderStyles.titlePlusArrow}>
        <BackIcon />
        <Text style={lyricsHeaderStyles.title}>{title}</Text>
      </View>
      <TouchableOpacity
        style={lyricsHeaderStyles.info}
        onPress={() => setIsInfoModalOpen(!isInfoModalOpen)}
      >
        <InfoIcon />
      </TouchableOpacity>
    </View>
  );
};

export default LyricsHeader;
