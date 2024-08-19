import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import TimeSignatureWheelModal from '@src/components/lyrics/components/TimeSignatureWheelModal';
import { SongDetailKey } from '@src/components/common/enums';
import { SONG_DETAILS } from '@src/components/common/constants';

interface Props {
  label: string;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { label, value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const [isChordWheelOpen, setIsChordWheelOpen] = useState(false);
  const [isTimeWheelOpen, setIsTimeWheelOpen] = useState(false);

  const songDetailPress = () => {
    if (label === SONG_DETAILS[SongDetailKey.KEY_SIGNATURE]) {
      setIsChordWheelOpen(true);
    } else {
      setIsTimeWheelOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={songDetailPress} style={styles.textbox}>
        <StyledText>{value}</StyledText>
      </TouchableOpacity>
      <Text>{label}</Text>
      <ChordWheelModal
        isWheelOpen={isChordWheelOpen}
        setIsWheelOpen={setIsChordWheelOpen}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
      <TimeSignatureWheelModal
        isWheelOpen={isTimeWheelOpen}
        setIsWheelOpen={setIsTimeWheelOpen}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
    </View>
  );
};

export default SongDetailSelect;
