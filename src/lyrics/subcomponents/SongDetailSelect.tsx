import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import ChordWheelModal from '../components/ChordWheelModal';
import StyledText from '@src/common/components/StyledText';

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

  // Expand wheel selector to include time signature. Have Written By be a text input, in settings, user can set default author

  const [isWheelOpen, setIsWheelOpen] = useState(false);

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      <TouchableOpacity
        onPress={() => setIsWheelOpen(true)}
        style={styles.textbox}
      >
        <StyledText>{value}</StyledText>
      </TouchableOpacity>
      <Text>{label}</Text>
      <ChordWheelModal
        isWheelOpen={isWheelOpen}
        setIsWheelOpen={setIsWheelOpen}
        detailKey={detailKey}
        handleInputChange={handleInputChange}
      />
    </View>
  );
};

export default SongDetailSelect;
