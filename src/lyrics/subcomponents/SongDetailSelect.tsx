import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSongDetailStyles from '@styles/songDetail';
import { SongInfo } from '@src/common/types';
import StyledText from '@src/common/components/StyledText';
import ChordWheelModal from '@src/lyrics/components/ChordWheelModal';
import TimeSignatureWheelModal from '@src/lyrics/components/TimeSignatureWheelModal';
import { SongDetail } from '@src/common/enums';

interface Props {
  detail: SongDetail;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { detail, value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const [isChordWheelOpen, setIsChordWheelOpen] = useState(false);
  const [isTimeWheelOpen, setIsTimeWheelOpen] = useState(false);

  const modifiedDetail = detail === SongDetail.KEY ? 'Key' : detail;

  const songDetailPress = () => {
    if (detail === SongDetail.KEY) {
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
      <Text>{modifiedDetail}</Text>
      <ChordWheelModal
        isWheelOpen={isChordWheelOpen}
        setIsWheelOpen={setIsChordWheelOpen}
        detail={detail}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
      <TimeSignatureWheelModal
        isWheelOpen={isTimeWheelOpen}
        setIsWheelOpen={setIsTimeWheelOpen}
        detail={detail}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
    </View>
  );
};

export default SongDetailSelect;
