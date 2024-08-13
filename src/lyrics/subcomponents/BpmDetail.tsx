import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@styles/songDetail';
import { SongInfo } from '@src/common/types';
import { SongDetail } from '@src/common/enums';

interface Props {
  detail: SongDetail;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const BpmDetail = (props: Props) => {
  const { detail, value, handleInputChange } = props;
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
      <Text>{detail}</Text>
    </View>
  );
};

export default BpmDetail;
