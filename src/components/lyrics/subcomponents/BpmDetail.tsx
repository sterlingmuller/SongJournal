import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/components/common/types';
import { SONG_DETAILS } from '@src/components/common/constants';

interface Props {
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const BpmDetail = (props: Props) => {
  const { value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textbox}
        value={value}
        onChangeText={(newBpm: string) => handleInputChange('bpm', newBpm)}
        textAlign="center"
        keyboardType="numeric"
        caretHidden
      />
      <Text>{SONG_DETAILS.bpm}</Text>
    </View>
  );
};

export default BpmDetail;
