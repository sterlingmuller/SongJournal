import React from 'react';
import { TextInput, View, Text } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';

interface Props {
  label: string;
  value: string;
  onPageScreen?: boolean;
}

const SongDetail = (props: Props) => {
  const { label, value, onPageScreen } = props;
  const styles = useSongDetailStyles();

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      <TextInput
        style={onPageScreen ? styles.pageTextbox : styles.textbox}
        value={value}
        textAlign="center"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
