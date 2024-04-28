import songDetailStyle from '@src/styles/songDetail';
import React from 'react';
import { TextInput, View, Text } from 'react-native';

interface Props {
  label: string;
  value: string;
  onPageScreen?: boolean;
}

const SongDetail = (props: Props) => {
  const { label, value, onPageScreen } = props;

  return (
    <View
      style={
        onPageScreen ? songDetailStyle.pageContainer : songDetailStyle.container
      }
    >
      <TextInput
        style={
          onPageScreen ? songDetailStyle.pageTextbox : songDetailStyle.textbox
        }
        value={value}
        textAlign="center"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
