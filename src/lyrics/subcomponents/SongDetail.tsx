import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';

interface Props {
  label: string;
  value: string;
  onPageScreen?: boolean;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetail = (props: Props) => {
  const { label, value, onPageScreen, handleInputChange } = props;
  const styles = useSongDetailStyles();

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      <TextInput
        style={onPageScreen ? styles.pageTextbox : styles.textbox}
        value={value}
        onChangeText={(text: string) =>
          handleInputChange(label as keyof SongInfo, text)
        }
        textAlign="center"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
