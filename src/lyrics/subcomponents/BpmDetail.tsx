import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';

interface Props {
  detailKey: string;
  label: string;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const BpmDetail = (props: Props) => {
  const { label, value, handleInputChange } = props;
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
      <Text>{label}</Text>
    </View>
  );
};

export default BpmDetail;
