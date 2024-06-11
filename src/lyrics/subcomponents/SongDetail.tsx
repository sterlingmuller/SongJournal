import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { page } from '@src/common/types';

interface Props {
  label: string;
  value: string;
  onPageScreen?: boolean;
  handleInputChange: (key: keyof page, value: string) => void;
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
          handleInputChange(label as keyof page, text)
        }
        textAlign="center"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
