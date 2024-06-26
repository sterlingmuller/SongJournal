import React from 'react';
import { TextInput, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import { KEY_SIGNATURES } from '@src/common/enums';

interface Props {
  label: string;
  value: string;
  onPageScreen?: boolean;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetail = (props: Props) => {
  const { label, value, onPageScreen, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const isKey = label === 'Key';
  const isTime = label === 'Time';

  console.log('isKey:', label);

  const renderInput =
    isKey || isTime ? (
      <RNPickerSelect
        value={value}
        onValueChange={(text: string) =>
          handleInputChange(label as keyof SongInfo, text)
        }
        items={KEY_SIGNATURES}
        style={{
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          },
        }}
        placeholder={'wee'}
        // ... your styles for the RNPickerSelect component
      />
    ) : (
      <TextInput
        style={onPageScreen ? styles.pageTextbox : styles.textbox}
        value={value}
        onChangeText={(text: string) =>
          handleInputChange(label as keyof SongInfo, text)
        }
        textAlign="center"
      />
    );

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      {renderInput}
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
