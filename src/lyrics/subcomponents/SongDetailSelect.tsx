import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import ChordWheelModal from '../components/ChordWheelModal';
import StyledText from '@src/common/components/StyledText';
import TimeSignatureWheelModal from '../components/TimeSignatureWheelModal';

interface Props {
  detailKey: string;
  label: string;
  value: string;
  onPageScreen?: boolean;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { detailKey, label, value, onPageScreen, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const [isChordWheelOpen, setIsChordWheelOpen] = useState(false);
  const [isTimeWheelOpen, setIsTimeWheelOpen] = useState(false);

  const songDetailPress = () => {
    if (detailKey === 'keySignature') {
      setIsChordWheelOpen(true);
    } else {
      setIsTimeWheelOpen(true);
    }
  };

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      <TouchableOpacity onPress={songDetailPress} style={styles.textbox}>
        <StyledText>{value}</StyledText>
      </TouchableOpacity>
      <Text>{label}</Text>
      <ChordWheelModal
        isWheelOpen={isChordWheelOpen}
        setIsWheelOpen={setIsChordWheelOpen}
        detailKey={detailKey}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
      <TimeSignatureWheelModal
        isWheelOpen={isTimeWheelOpen}
        setIsWheelOpen={setIsTimeWheelOpen}
        detailKey={detailKey}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
    </View>
  );
};

export default SongDetailSelect;
