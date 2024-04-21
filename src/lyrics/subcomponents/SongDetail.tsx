import songDetailStyle from '@src/styles/songDetail';
import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

interface Props {
  label: string;
}

const SongDetail = ({ label }: Props) => {
  const [detail, setDetail] = useState('');

  return (
    <View style={songDetailStyle.container}>
      <TextInput style={songDetailStyle.textbox} placeholder={'G'} textAlign="center" />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
