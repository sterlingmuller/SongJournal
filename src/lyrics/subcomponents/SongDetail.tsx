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

const SongDetail = (props: Props) => {
  const { detailKey, label, value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textbox}
        value={value}
        onChangeText={(text: string) =>
          handleInputChange(detailKey as keyof SongInfo, text)
        }
        textAlign="center"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
